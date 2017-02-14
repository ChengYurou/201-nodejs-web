const Item = require('../model/item');
const Category = require('../model/category');
const Cart = require('../model/cart');

const item = require('./fixture/item');
const cart = require('./fixture/cart');
const category = require('./fixture/category');

const modelMap = [
  Cart,
  Category,
  Item
];
const data = {
  Cart:cart,
  Category:category,
  Item:item,
};

const docs = Object.keys(modelMap);

module.exports = (done) => {
  let count = 0;
  modelMap.forEach(Model => {
    Model.remove({}, () => {
      Model.create(data[Model.modelName],() => {
        count ++;
        if(count === modelMap.length){
          console.log('refreshMongo success!')
          done();
        }
      })
    })
  })
};
