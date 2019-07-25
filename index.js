const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/contracts")
    .then(() => console.log("connected to MongoDb"))
    .catch(err => console.log("could not connect to mongodb"));

const fileSchema = new mongoose.Schema({
    startDate: String,
    endDate: String,
    firstParty: String,
    secondParty: String,
    firstPartyAddress: String,
    secondPartyAddress: String,
    fileName: String
});

const Files = mongoose.model("fileToDb", fileSchema);

async function fileToDb() {
    const files = new Files({
        startDate: '27th of july',
        endDate: '3 months',
        firstParty: 'xyz tech',
        secondParty: 'abc tech',
        firstPartyAddress: 'pppp',
        secondPartyAddress: 'nnnn',
        fileName: 'xyz.doc'
    });
    try {
        const result = await files.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors) console.log(ex.errors[field].message);
    }
}

fileToDb();