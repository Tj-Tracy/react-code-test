'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _zipcode = require('./zipcode');

var _zipcode2 = _interopRequireDefault(_zipcode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//environment variables
_dotenv2.default.config();
//create express app
var app = (0, _express2.default)();
//configure the parser
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use(_express2.default.static(_path2.default.join(__dirname, '../build')));
app.use((0, _morgan2.default)('dev'));

//connect to the database
var db = exports.db = _mongoose2.default.connect(process.env.ZIPCODE_DB, {
  useMongoClient: true
});
db.on('error', function (err) {
  console.log('connection error: ' + err);
});
db.once('open', function () {
  console.log('connected to db');
});

// this was the quick and dirty code I used to get the data onto a mongoDB

// fs.readFile(__dirname + '/free-zipcode-database.csv', (err, data) => {
//   console.log(err)
//   data = data.toString().replace(/['"]+/g, '').split(/[,\r\n]+/g);
//   let zipCodeJSON = []
//   for (let i = 0; i < data.length; i = i + 12) {
//     let newCode = {
//       ZipCode: data[i],
//       ZipCodeType: data[i + 1],
//       City: data[i + 2],
//       State: data[i + 3],
//       LocationType: data[i + 4],
//       Lat: data[i + 5],
//       Long: data[i + 6],
//       Location: data[i + 7],
//       Decommisioned: data[i + 8],
//       TaxReturnsFiled: data[i + 9],
//       EstimatedPopulation: data[i + 10],
//       TotalWages: data[i + 11]
//     }
//     zipCodeJSON.push(newCode);
//   }


//   zipCodeJSON.map(item => {
//     const newZip = new ZipCode({
//       ZipCode: item.ZipCode,
//       Lat: item.Lat,
//       Long: item.Long
//     })
//     newZip.save(err => {
//       if (err) {
//         console.log(err);
//         return;
//       } else {
//         console.log("saved");

//       }
//     });


//   })
// });

app.get("/", function (req, res) {
  res.sendFile(_path2.default.join(__dirname, "../build", "index.html"));
});

app.post("/zipLookup", function (req, res) {
  var zipOne = req.body.ZipCodeOne.toString();
  var zipTwo = req.body.ZipCodeTwo.toString();
  _zipcode2.default.find({
    $or: [{
      ZipCode: zipOne
    }, {
      ZipCode: zipTwo
    }]
  }, 'ZipCode Long Lat', function (err, zip) {
    if (zip[0] && zip[1]) {
      return res.json({
        success: true,
        zip: zip
      });
    }
    if (err) {
      return res.json({
        success: false,
        reason: err
      });
    }
    console.log('hi');
    return res.json({
      success: false,
      reason: "No zip Code"
    });
  });
});

app.listen(process.env.PORT || 5000, function () {
  return console.log('5000');
});