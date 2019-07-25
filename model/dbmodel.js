const mongoose = require("mongoose");

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

//exporting the schema of model
module.exports.Files = mongoose.model("Files", fileSchema);