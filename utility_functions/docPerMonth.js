const model = require("../model/dbmodel");
const mongoose = require("mongoose");

//schema of the month
const months = model.months;

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

//function to update the count of the month whenever we train the model.
async function documentPerMonth() {
    try {
        const monthDetail = await months.findById("5d5cda115574e92e28f2907e");
        const date = new Date();
        let month = monthNames[date.getMonth()];
        monthDetail[month] = monthDetail[month] + 1;
        const result = await monthDetail.save();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
module.exports.monthNames = monthNames;
module.exports.documentPerMonth = documentPerMonth;