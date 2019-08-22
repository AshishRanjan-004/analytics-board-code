const dateFormatter = require("../dateFormatter");
const WtoN = require('words-to-num');
const model = require("../model/dbmodel");
//files schema.
const Files = model.Files;

// function to save the details of the 
function saveEntitiesToDatabase(data) {
    try {
        data.forEach(async values => {
            let StartDateIntoMilliSecond = values.response.effectiveDate;
            let validity = values.response.validity;
            let firstParty = values.response.firstParty;
            let secondParty = values.response.secondParty;
            let firstPartyAddress = values.response.firstPartyAddress;
            let secondPartyAddress = values.response.secondPartyAddress;

            //validating the effective/start date
            if ((typeof StartDateIntoMilliSecond === "undefined") || (StartDateIntoMilliSecond == "")) {
                StartDateIntoMilliSecond = "NO EFFECTIVE DATE";
            } else {
                StartDateIntoMilliSecond = dateFormatter.startDateFormater(StartDateIntoMilliSecond);
            }

            //validating the end/validity date
            //console.log(validity);
            if ((typeof validity === "undefined") || (validity == "") || (isNaN(WtoN.convert(validity.split(" ")[0])))) {
                validity = "NO END DATE";
            } else {
                validity = dateFormatter.endDateFormator(StartDateIntoMilliSecond, validity)
            }

            //validating the firstParty
            if ((typeof firstParty === "undefined") || (firstParty == "")) {
                firstParty = "NO FIRST PARTY MENTIONED"
            }

            //validating the secondParty
            if ((typeof secondParty === "undefined") || (secondParty == "")) {
                secondParty = "NO SECOND PARTY MENTIONED"
            }

            //validating the firstPartyAddress
            if ((typeof firstPartyAddress === "undefined") || (firstPartyAddress == "")) {
                firstPartyAddress = "NO FIRST PARTY ADDRESS MENTIONED"
            }

            //validating the secondPartyAddress
            if ((typeof secondPartyAddress === "undefined") || (secondPartyAddress == "")) {
                secondPartyAddress = "NO SECOND PARTY ADDRESS MENTIONED"
            }
            const files = new Files({
                startDate: StartDateIntoMilliSecond,
                endDate: validity,
                firstParty: firstParty,
                secondParty: secondParty,
                firstPartyAddress: firstPartyAddress,
                secondPartyAddress: secondPartyAddress,
                fileName: values.response.fileName
            });
            try {
                result = await files.save();
                console.log(result);
            } catch (ex) {
                for (field in ex.errors) console.log(ex.errors[field].message);
            }
        });
    } catch (e) {
        console.log("something went wrong!!!!" + "/n/n/n" + e);
    }
}

module.exports.saveEntitiesToDatabase = saveEntitiesToDatabase;