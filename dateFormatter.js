var moment = require("moment");
var WtoN = require('words-to-num');

//object of month
let monthsObject = {
    January: '01',
    january: '01',
    February: "02",
    february: "02",
    March: "03",
    march: "03",
    April: "04",
    april: "04",
    May: "05",
    may: "05",
    June: "06",
    june: "06",
    July: "07",
    july: "07",
    August: "08",
    august: "08",
    September: "09",
    september: "09",
    October: "10",
    october: "10",
    November: "11",
    november: "11",
    December: "12",
    december: "12"
}

//getting the all keys of monthobject
let months = Object.keys(monthsObject);


//function to change the startdate/effectivedate to the millisecond
function startDateFormator(unformattedDate) {
    //condition if the startdate start with number e.g 29th day of december, 2019
    if (unformattedDate[0] >= '0' && unformattedDate[0] <= '9') {
        let dateTokenizer = unformattedDate.replace(/\s+/g, ' ').trim().split(" ");
        let year = dateTokenizer[dateTokenizer.length - 1];
        let month = dateTokenizer[dateTokenizer.length - 2].replace(/[, ]+/g, " ").trim();
        let day = dateTokenizer[0].match(/\d+/g).toString();
        if (day.length <= 1) {
            day = '0' + day;
        }
        let formateddate = year + "-" + monthsObject[month] + "-" + day;
        console.log(formateddate);
        return Date.parse(formateddate);

    }
    //condition if the startdate start with the month name e.g November 29, 1996 
    else if (months.includes(unformattedDate.split(" ")[0])) {
        var d = new Date(unformattedDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return Date.parse([year, month, day].join('-'));
    } else {
        return "NO EFFECTIVE DATE";
    }
}

//function to  convert the validity/enddate to millisecond. 
function endDateFormator(StartDateIntoMilliSecond, duration) {
    //condition if there is no startDate
    if ((startDateFormator === "undefined") || (StartDateIntoMilliSecond === "")) {
        return "NO END DATE"
    }
    //condition when there is a start date.
    else {
        let temp = "";
        let timeDuration = duration.split(" ")[0];
        console.log(timeDuration[0]);
        if ((timeDuration[0] >= 'A' && timeDuration[0] <= 'Z') || (timeDuration[0] >= 'a' && timeDuration[0] <= 'z')) {
            timeDuration = WtoN.convert(timeDuration);

        }
        console.log(timeDuration);
        let date = new Date(StartDateIntoMilliSecond);
        let isoDate = date.toLocaleDateString().split('/');

        //reversing the date to the ISO date format to change the validity to the millisecond.
        if (isoDate[0].length === 1) {
            let temp = "0" + isoDate[0];
        } else {
            temp = isoDate[0]
        }

        if (isoDate[1].length === 1) {
            isoDate[0] = "0" + isoDate[1]
        } else {
            isoDate[0] = isoDate[1];
        }
        isoDate[1] = temp;

        isoDate = isoDate.reverse().join('-');
        console.log(isoDate);
        //condition when the validity/enddate contains years.
        if (
            duration.includes("year") ||
            duration.includes("years") ||
            duration.includes("Year") ||
            duration.includes("Years")
        ) {

            return Date.parse(moment(isoDate)
                .add(timeDuration, "years")
                .format()
                .match(/[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/)[0]);
        }
        //condition when exact enddat is given
        else if (months.includes(duration.split(" ")[0])) {
            var d = new Date(duration),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return Date.parse([year, month, day].join('-'));

        }
        //condition when validity contains the months.
        else if (duration.includes("month") ||
            duration.includes("months") ||
            duration.includes("Month") ||
            duration.includes("Months")) {
            return Date.parse(moment(isoDate)
                .add(timeDuration, "months")
                .format()
                .match(/[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/)[0]);
        }
        //when no validty is not present or the validity is not appropriate.
        else {
            return "INVALID ENDDATE"
        }
    }
}

//exporting the formatted startdate and enddate.
module.exports.startDateFormater = startDateFormator;
module.exports.endDateFormator = endDateFormator;