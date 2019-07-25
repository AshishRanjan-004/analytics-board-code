const moment = require('moment');
var WtoN = require('words-to-num');


// let date = new Date(1563129000000).toString()

// console.log(date);

// var unixTimeZero = Date.parse('01 Jan 1970 00:00:00 GMT');
// var javaScriptRelease = Date.parse('aug 23, 1996');

// console.log(unixTimeZero);
// // expected output: 0

// console.log(javaScriptRelease);


// function date() {
//     var d = new Date('May 30, 2003'),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;

//     return [year, month, day].join('-');
// }

// let val = moment(date()).add(WtoN.convert('six'), 'months').format().match(/[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/)[0];
// console.log(val);

// let monthsObject = {
//     January: '01',
//     january: '01',
//     February: "02",
//     february: "02",
//     March: "03",
//     march: "03",
//     April: "04",
//     april: "04",
//     May: "05",
//     may: "05",
//     June: "06",
//     june: "06",
//     July: "07",
//     july: "07",
//     August: "08",
//     august: "08",
//     September: "09",
//     september: "09",
//     October: "10",
//     october: "10",
//     November: "11",
//     november: "11",
//     December: "12",
//     december: "12"
// }

// function isoDate(unformattedDate) {
//     if (unformattedDate[0] >= '0' && unformattedDate[0] <= '9') {
//         let dateTokenizer = unformattedDate.replace(/\s+/g, ' ').trim().split(" ");
//         let year = dateTokenizer[dateTokenizer.length - 1];
//         let month = dateTokenizer[dateTokenizer.length - 2].replace(/[, ]+/g, " ").trim();
//         let day = dateTokenizer[0].match(/\d+/g).toString();
//         if (day.length <= 1) {
//             day = '0' + day;
//         }
//         let formateddate = year + "-" + monthsObject[month] + "-" + day;
//         console.log(formateddate);
//         return Date.parse(formateddate);

//     } else {
//         var d = new Date(unformattedDate),
//             month = '' + (d.getMonth() + 1),
//             day = '' + d.getDate(),
//             year = d.getFullYear();

//         if (month.length < 2) month = '0' + month;
//         if (day.length < 2) day = '0' + day;

//         return Date.parse([year, month, day].join('-'));
//     }
// }
// let date = isoDate('December 20, 2011');
// console.log(date);
// let k;
// let key = {
//     entity: 'firstParty'
// }
// console.log(key['entity']);
// let json = [{
//         "_id": "5d2d71f85023fe3b5828ad8f",
//         "firstParty": "alphabet, inc"
//     },
//     {
//         "_id": "5d2d71f85023fe3b5828ad90",
//         "firstParty": "oracle, inc"
//     }
// ]

// json = JSON.stringify(json).split(`"${key['entity']}"`).join(`"value"`);
// console.log(json);


// let date = "";

// let obj = {
//     ver: function () {
//         if (date == "") {
//             return "date isn't define";
//         }
//     }
// }

// console.log(obj.ver);

//2016-07-25
console.log(typeof 1376438400000);
console.log(new Date(Number('1376438400000')).toISOString().substring(0, 10));