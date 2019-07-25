// let unformattedDate = "9th day 0f march, 2005";

// //resultant march 30, 2005

// let dateTokenizer = unformattedDate.split(" ");
// console.log(dateTokenizer);

// let year = dateTokenizer[dateTokenizer.length - 1];
// let month = dateTokenizer[dateTokenizer.length - 2].replace(/[, ]+/g, " ").trim();
// let day = dateTokenizer[0].match(/\d+/g).toString();
// let formateddate = month + " " + day + "," + " " + year;
// console.log(formateddate);

// var javaScriptRelease = Date.parse(formateddate);

// console.log(javaScriptRelease);
var moment = require("moment");
var WtoN = require('words-to-num');

// let dday = date.toLocaleDateString().split('/');
// console.log(dday);
// let temp = dday[0];
// dday[0] = dday[1];
// dday[1] = temp;

// dday = dday.reverse().join('-');


// console.log(dday);

// let fdate = moment(dday)
//     .add(3, "years")
//     .format()
//     .match(/[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/)[0];

// console.log(fdate);

// let val = "hello"


// if ((val[0] >= 'a' && val[0] <= 'z') || (val[0] >= 'A' && val[0] <= 'Z')) {
//     console.log('hello duniya');
// }

function endDate(ms, duration) {
    let timeDuration = duration.split(" ")[0];
    console.log(timeDuration[0]);
    if ((timeDuration[0] >= 'A' && timeDuration[0] <= 'Z') || (timeDuration[0] >= 'a' && timeDuration[0] <= 'z')) {
        timeDuration = WtoN.convert(timeDuration);
        console.log("hello world");
    }
    console.log(timeDuration);
    let date = new Date(ms);
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

console.log(endDate(1324339200000, "six (6) months"));