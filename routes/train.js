//npm libraries
const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();
const fs = require("fs");

//middlewares
var bodyParser = require("body-parser");
router.use(bodyParser.json({
    limit: "50mb",
    type: "application/json"
}));
// router.use(bodyParser());

//API to train the model.
router.post("/model", (req, res) => {
    let data = req.body;
    let jsonArray = [];
    generator(jsonArray, data, res);
});

//function that prepare the training data

function generator(jsonArray, data, res) {
    let dataLength = data.length;
    const promise = new Promise((resolve, reject) => {
        //getting all the values from the documents.
        data.forEach(eachdocumentData => {
            let entities = {
                effectiveDate: eachdocumentData.effectiveDate,
                validity: eachdocumentData.validity,
                firstParty: eachdocumentData.firstParty,
                firstPartyAddress: eachdocumentData.firstPartyAddress,
                secondParty: eachdocumentData.secondParty,
                secondPartyAddress: eachdocumentData.secondPartyAddress
            };

            //fetching the post api of tokenizer to tokenize the documents.
            fetch("http://54.173.74.33:5000/tokenizer", {
                    method: "post",
                    body: eachdocumentData.text,

                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(resp => resp.json("hello"))
                .then(json => {
                    json.forEach(element => {
                        let flag = false;
                        let entityData = [];
                        for (let key in entities) {
                            if (entities[key] != "") {
                                let value = entities[key].replace(/\n/g, " ");
                                //preparing every entities
                                element = element.replace(/\n/g, " ");
                                if (element.includes(value)) {
                                    entityData.push({
                                        start: element.indexOf(value),
                                        end: element.indexOf(value) + value.length,
                                        value: value,
                                        entity: key
                                    });
                                    flag = true;
                                }
                            }
                        }
                        if (flag) {
                            //pushing the  objects(contains intent, entities, text)  into the array
                            jsonArray.push({
                                text: element,
                                intent: "effectiveDate&PartyNames&Address",
                                entities: entityData
                            });
                        }
                    });
                    dataLength = dataLength - 1;
                    if (dataLength == 0) {
                        resolve(jsonArray);
                    }
                });
        });
    });
    promise.then(result => updateJson(result, res));
}

//function to update the training JSON

function updateJson(jsonArray, res) {
    fs.readFile("training_data.json", (err, data) => {
        if (err) throw err;
        let d = JSON.parse(data);
        var commonExamplesLength = d["rasa_nlu_data"]["common_examples"].length;
        // Finding all duplicate Intents index and remove
        var isDuplicateIntentFound = false;
        for (
            var exampleIndex = 0; exampleIndex < commonExamplesLength; exampleIndex++
        ) {
            for (var jsonIndex = 0; jsonIndex < jsonArray.length; jsonIndex++) {
                if (
                    d["rasa_nlu_data"]["common_examples"][exampleIndex].text.trim() ==
                    jsonArray[jsonIndex].text
                ) {
                    if (
                        d["rasa_nlu_data"]["common_examples"][exampleIndex].entities
                        .length == jsonArray[jsonIndex].entities.length
                    ) {
                        for (
                            var entityIndex = 0; entityIndex < jsonArray[jsonIndex].entities.length; entityIndex++
                        ) {
                            if (
                                d["rasa_nlu_data"]["common_examples"][exampleIndex].entities[
                                    entityIndex
                                ].entity.trim() ==
                                jsonArray[jsonIndex].entities[entityIndex].entity.trim()
                            ) {
                                isDuplicateIntentFound = true;
                            }
                        }
                    }
                }
            }
            if (isDuplicateIntentFound) {
                d["rasa_nlu_data"]["common_examples"].splice(exampleIndex, 1);
                isDuplicateIntentFound = false;
                commonExamplesLength = commonExamplesLength - 1;
            }
        }

        let d1 = [...d.rasa_nlu_data.common_examples, ...jsonArray];

        d.rasa_nlu_data.common_examples = d1;
        fs.writeFile("training_data.json", JSON.stringify(d), "utf8", err => {
            // In case of a error throw err.
            if (err) throw err;
        });
        fs.writeFile(
            "./trainingJsonFilesFolder/" + "training_data" + Math.random() + ".json",
            JSON.stringify(jsonArray),
            "utf8",
            err => {
                // In case of a error throw err.
                if (err) throw err;
            }
        );
        trainModel(res);
    });
}

function trainModel(res) {
    //Read File
    fs.readFile("training_data.json", (err, data) => {
        if (err) throw err;
        let d = JSON.parse(data);
        console.log("train model called");

        //API url of training model.
        const url = "http://192.168.1.36:5000/train?project=current&model=nlu";

        //RASA NLU pipelines
        let training_data = `language: \"en\"\r\n\r\npipeline:\r\n  - name: \"nlp_spacy\"\r\n    case_sensitive: true\r\n  - name: \"tokenizer_spacy\"\r\n  - name: \"intent_entity_featurizer_regex\"\r\n  - name: \"intent_featurizer_spacy\"\r\n  - name: \"ner_crf\"\r\n    \"features\": [\r\n            [\"prefix5\", \"prefix2\", \"suffix3\",\r\n             \"suffix2\", \"title\", \"upper\"],\r\n            [\"bias\", \"pos\", \"upper\", \"title\", \"digit\", \"pattern\"],\r\n            [\"prefix5\", \"prefix2\", \"suffix3\",\r\n             \"suffix2\", \"title\", \"upper\"]]\r\n  - name: \"ner_synonyms\"\r\n  - name: \"intent_featurizer_count_vectors\"\r\n  - name: \"intent_classifier_tensorflow_embedding\"\r\n\r\ndata: ${JSON.stringify(
      d
    )}`;
        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: "POST",
            body: training_data,
            headers: {
                "Content-Type": "application/x-yml"
            }
        };
        fetch(url, fetchData)
            .then(response => res.json())
            .then(data => console.log("Training Completed"));
    });
}

module.exports = router;