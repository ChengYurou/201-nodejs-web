var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
  value: String
});

module.exports = mongoose.model('item', item);