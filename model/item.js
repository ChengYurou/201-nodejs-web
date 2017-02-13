var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name:String,
  price: Number,
  category:{
    type:Schema.ObjectId,
    ref:'Category'
  }
});

module.exports = mongoose.model('Item',itemSchema);
