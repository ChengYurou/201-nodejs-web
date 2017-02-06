var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
  value: String
});

module.exports = mongoose.model('Item', Item);