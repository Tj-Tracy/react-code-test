import mongoose, { Schema } from 'mongoose';

const ZipCodeSchema = mongoose.Schema({
  ZipCode: {
    type: String
  },
  Lat: {
    type: String
  },
  Long: {
    type: String
  }
})

const ZipCode = mongoose.model('ZipCode', ZipCodeSchema);
export default ZipCode;