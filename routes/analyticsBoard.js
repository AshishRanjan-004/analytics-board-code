const express = require("express");
const router = express.Router();
const model = require("../model/dbmodel");
const monthLabel = require("../utility_functions/docPerMonth");

//schema refernce of the collection
const Files = model.Files;
const monthprototype = model.months;

//numeric to sring month object

let months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
};

//API TO GET THE NUMBER OF CONTRACTS IN THE DATABASE.
router.get("/noOfContracts", async (req, res) => {
    try {
        let companycountt = await Files.find().companycounttDocuments();
        res.json({
            totalNoOfDocument: companycountt
        });
    } catch (error) {
        res.status(400).send("BAD REQUEST");
    }
});

//API TO PLOT THE TRENDING GRAPH OF NO. TRAINING PER MONTH.
router.get("/trendingGraph/training", async (req, res) => {
    try {
        let monthDetail = await monthprototype.findById("5d5cda115574e92e28f2907e");
        let label = monthLabel.monthNames;
        let series = [];
        size = label.length;
        label.forEach(element => {
            series.push(monthDetail[element]);
            size = size - 1;
            if (size == 0) {
                res.json({
                    label: label,
                    series: [series]
                });
            }
        });
    } catch (error) {
        res.status(404).send("Random Error Generated");
    }
});

//API FOR HISTOGRAM TO GET THE NUMBER OF DOCUMENT PER COMPANY
router.get("/histogram", async (req, res) => {
    try {
        let retrievedjson = await Files.find({}, {
            firstParty: 1,
            _id: 0
        });
        let companycount = {};
        let labels = [];
        let series = [];
        let size = retrievedjson.length;
        retrievedjson.forEach(element => {
            if (element.firstParty in companycount) {
                companycount[element.firstParty] = companycount[element.firstParty] + 1;
            } else {
                companycount[element.firstParty] = 1;
            }
            size = size - 1;
            if (size == 0) {
                let length = Object.keys(companycount).length;
                for (let keys in companycount) {
                    labels.push(keys);
                    series.push(companycount[keys]);
                    length = length - 1;
                    if (length == 0) {
                        res.json({
                            labels: labels,
                            series: [series]
                        });
                    }
                }
            }
        });
    } catch (error) {
        res.status(404).send("DATA NOT FOUND");
    }
});

//API TO PLOT THE TRENDING GRAPH FOR THE GIVEN COMPANY EXPIRE DATE PER MONTH
router.get("/trending/companies/:firstParty", async (req, res) => {
    try {
        console.log(req.params.firstParty);
        let retrievedjson = await Files.find({
            firstParty: [req.params.firstParty],
        }, {
            _id: 0,
            endDate: 1,
        });
        let label = monthLabel.monthNames;
        let series = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let size = retrievedjson.length;
        retrievedjson.forEach(element => {
            if (!(isNaN(element.endDate))) {
                let monthNumber = new Date(Number(element.endDate)).getMonth();
                series[monthNumber] = series[monthNumber] + 1;
                size = size - 1;
                if (size == 0) {
                    res.json({
                        label: label,
                        series: [series]
                    })
                }
            }
        });
    } catch (error) {
        res.status(404).send("NO DATA FOUND");
    }
});

module.exports = router;