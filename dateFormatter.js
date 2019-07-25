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

function startDateFormator(unformattedDate) {
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

    } else {
        var d = new Date(unformattedDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return Date.parse([year, month, day].join('-'));
    }
}

function endDateFormator(StartDateIntoMilliSecond, duration) {
    let timeDuration = duration.split(" ")[0];
    console.log(timeDuration[0]);
    if ((timeDuration[0] >= 'A' && timeDuration[0] <= 'Z') || (timeDuration[0] >= 'a' && timeDuration[0] <= 'z')) {
        timeDuration = WtoN.convert(timeDuration);

    }
    console.log(timeDuration);
    let date = new Date(StartDateIntoMilliSecond);
    let isoDate = date.toLocaleDateString().split('/');
    let temp = isoDate[0];
    isoDate[0] = isoDate[1];
    isoDate[1] = temp;

    isoDate = isoDate.reverse().join('-');
    console.log(isoDate);
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
    } else {
        return Date.parse(moment(isoDate)
            .add(timeDuration, "months")
            .format()
            .match(/[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/)[0]);
    }
}

//exporting the formatted date
module.exports.startDateFormater = startDateFormator;
module.exports.endDateFormator = endDateFormator;