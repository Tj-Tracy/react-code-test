import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path, {
  parse
} from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import ZipCode from './zipcode';

//environment variables
dotenv.config();
//create express app
const app = express();
//configure the parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, '../build')));
app.use(morgan('dev'));

//connect to the database
export const db = mongoose.connect(process.env.ZIPCODE_DB, {
  useMongoClient: true
});
db.on('error', (err) => {
  console.log('connection error: ' + err)
});
db.once('open', () => {
  console.log('connected to db')
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.post("/zipLookup", (req, res) => {
  let zipOne = req.body.ZipCodeOne.toString();
  let zipTwo = req.body.ZipCodeTwo.toString();
  ZipCode.find({
    $or: [{
        ZipCode: zipOne
      },
      {
        ZipCode: zipTwo
      }
    ]
  }, 'ZipCode Long Lat', (err, zip) => {
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
    console.log('hi')
    return res.json({
      success: false,
      reason: "No zip Code"
    });
  })
});

app.listen(process.env.PORT || 5000, () => console.log('5000'));