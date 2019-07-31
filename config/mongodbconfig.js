const mongoose = require("mongoose");


function dbConfig() {
    mongoose
        .connect("mongodb+srv://zorangcontract:ranjan008@cluster0-1ylvq.mongodb.net/contracts?retryWrites=true&w=majority", {
            useNewUrlParser: true
        })
        .then(() => console.log("connected to MongoDb"))
        .catch(err => console.log("could not connect to mongodb" + err));

}

//exporting the connection and configuration
module.exports.dbConfig = dbConfig;
