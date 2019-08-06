const express = require("express");
const router = express.Router();
const model = require("../model/dbmodel");
const dateFormatter = require("../dateFormatter");
const fs = require("fs");
const IncomingForm = require("formidable").IncomingForm;
var axios = require("axios");

const Files = model.Files;

//columnsData for showing data on UI while fetching data for entity:value
//doing commit
let columnsData = [{
    label: "S No.",
    field: "id",
    sort: "asc",
    width: 150
  },
  {
    label: "Document Name",
    field: "documentname",
    sort: "asc",
    width: 270
  },
  {
    label: "First Party",
    field: "firstparty",
    sort: "asc",
    width: 200
  },
  {
    label: "Second Party",
    field: "secondparty",
    sort: "asc",
    width: 100
  },
  {
    label: "Start date",
    field: "startdate",
    sort: "asc",
    width: 150
  },
  {
    label: "Termination date",
    field: "terminationdate",
    sort: "asc",
    width: 100
  },
  {
    label: "Quick View",
    field: "viewdocument",
    sort: "asc",
    width: 100
  }
];

//API to insert all data to mongodb
router.post("/files", (req, res) => {
  try {
    req.body.forEach(async values => {
      let StartDateIntoMilliSecond = dateFormatter.startDateFormater(
        values.startDate
      );
      const files = new Files({
        startDate: StartDateIntoMilliSecond,
        endDate: dateFormatter.endDateFormator(
          StartDateIntoMilliSecond,
          values.endDate
        ),
        firstParty: values.firstParty,
        secondParty: values.secondParty,
        firstPartyAddress: values.firstPartyAddress,
        secondPartyAddress: values.secondPartyAddress,
        fileName: values.fileName
      });
      try {
        result = await files.save();
        console.log(result);
      } catch (ex) {
        for (field in ex.errors) console.log(ex.errors[field].message);
      }
    });

    res.send("all records are inserted");
  } catch (e) {
    res.status(400).send("something went wrong!!!!" + "/n/n/n" + e);
  }
});

//API to fetch the search result
router.get("/search/:entityname/:entityvalue", async (req, res) => {
  try {
    let rowsData = [];
    const retrievedFilesData = await Files.find({
      [req.params.entityname]: [req.params.entityvalue]
    });
    if (retrievedFilesData.length > 0) {
      let unformatedJson = retrievedFilesData;
      unformatedJson.forEach(value => {
        let docValueObject = {
          id: value._id,
          documentname: value.fileName,
          firstparty: value.firstParty,
          secondparty: value.secondParty,
          startdate: new Date(Number(value.startDate))
            .toISOString()
            .substring(0, 10),
          terminationdate: new Date(Number(value.endDate))
            .toISOString()
            .substring(0, 10)
        };
        rowsData.push(docValueObject);
      });
      let formatedJson = {
        columns: columnsData,
        rows: rowsData
      };

      res.json(formatedJson);
    } else
      res.json({
        error: `no result found`
      });
  } catch (e) {
    res.status(400).send("something went wrong" + "/n/n/n" + e);
  }
});

//API to fetch the particular entity result.
router.get("/projection/:entity", async (req, res) => {
  try {
    console.log(req.params);
    const retrievedjson = await Files.find({}, {
      [req.params.entity]: 1,
      _id: 1
    });
    let modifiedjson = retrievedjson;
    modifiedjson = JSON.stringify(modifiedjson)
      .split(`"${req.params.entity}"`)
      .join(`"label"`);
    modifiedjson = modifiedjson.split(`"_id"`).join(`"value"`);
    res.send(JSON.parse(modifiedjson));
  } catch (e) {
    res.status(400).send("something went wrong" + "/n/n/n" + e);
  }
});

//API to get the document attached with the given id.
router.get("/contracts/:id", async (req, res) => {
  try {
    console.log(req.params);
    const retrievedFilesData = await Files.find({
      _id: req.params.id
    });
    console.log(retrievedFilesData[0].fileName);
    fs.exists("./contracts/" + retrievedFilesData[0].fileName, exists => {
      if (exists) {
        const readStream = fs.createReadStream(
          "./contracts/" + retrievedFilesData[0].fileName,
          "utf8"
        );
        readStream.pipe(res);
      } else {
        res.status(404).json({
          error: `file doesn't exist`
        });
      }
    });
  } catch (e) {
    res.status(400).send("something went wrong" + "/n/n/n" + e);
  }
});



//exporting the routers
module.exports = router;