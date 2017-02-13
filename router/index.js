const items = require('./routers/items');
const category = require('./routers/category');
const cart = require('./routers/cart');

module.exports = function (app) {
  app.use('/items', items);
  app.use('/category', category);
  app.use('/cart', cart);
};