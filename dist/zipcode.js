'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZipCodeSchema = _mongoose2.default.Schema({
  ZipCode: {
    type: String
  },
  Lat: {
    type: String
  },
  Long: {
    type: String
  }
});

var ZipCode = _mongoose2.default.model('ZipCode', ZipCodeSchema);
exports.default = ZipCode;