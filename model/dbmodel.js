const mongoose = require("mongoose");

//schema of storing the document detail.
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

//schema of storing number of training per month.
const month = new mongoose.Schema({
    Jan: Number,
    Feb: Number,
    Mar: Number,
    Apr: Number,
    May: Number,
    Jun: Number,
    Jul: Number,
    Aug: Number,
    Sep: Number,
    Oct: Number,
    Nov: Number,
    Dec: Number
});

//exporting the schema of model
module.exports.months = mongoose.model("months", month);
module.exports.Files = mongoose.model("Files", fileSchema);