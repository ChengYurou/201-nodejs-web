var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
  categoryName:String,
  items:[{
    type:Schema.Types.ObjectId,
    ref:'Item'
  }]
});

module.exports = mongoose.model('Category',Category);