var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cart = new Schema({
  userId: String,
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

module.exports = mongoose.model('Cart', Cart);