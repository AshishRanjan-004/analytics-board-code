const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/contracts", {
        useNewUrlParser: true
    })
    .then(() => console.log("connected to MongoDb"))
    .catch(err => console.log("could not connect to mongodb"));

const fileSchema = new mongoose.Schema({
    startDate: String,
    endDate: String,
    formatedStartDate: String,
    formatedEndDate: String,
    firstParty: String,
    secondParty: String,
    firstPartyAddress: String,
    secondPartyAddress: String,
    fileName: String
});

const Files = mongoose.model("Files", fileSchema);

//columnsData
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


async function getvalue(a, b) {
    let rowsData = [];

    const retrievedFilesData = await Files.find({
        _id: '5d2eacb3197f48233c1f89cc'
    });
    console.log(retrievedFilesData[0].fileName);

}

getvalue("firstParty", "google, inc");