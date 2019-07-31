//npm and custom modules
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')
const dbConnection = require('./config/mongodbconfig')
const files = require('./routes/files')

//good work

//global variables
var result = null;

//middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());

//mongoose connections
dbConnection.dbConfig();

//middleware to access the api of files.js
app.use('/api', files);



app.listen(3000, () => {
    console.log('listening to 3000');
});
