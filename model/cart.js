var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  userId: String,
  items: [{
    count: Number,
    item: {
      type: Schema.ObjectId,
      ref: 'Item'
    }
  }]
});

module.exports = mongoose.model('Cart', cartSchema);