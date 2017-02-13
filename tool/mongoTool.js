const mongoose = require('mongoose');
const rawData = require('./fixture/raw-data');
const Item = require('../model/item');
const Category = require('../model/category');
const Cart = require('../model/cart');

const modelMap = {
  Item,
  Cart,
  Category
};

mongoose.connect('mongodb://localhost/supermarket', (err) => {
  if (err) {
    console.log('connect error!');
  } else {
    console.log('connect success!')
  }
});

let docs = Object.keys(rawData);

Object.keys(rawData).forEach((key) => {
  modelMap[key].remove(()=> {
    modelMap[key].create(rawData[key], ()=> {
      docs = docs.filter(doc => doc != key);
      if (docs.length === 0) {
        console.log('refreshMongo success!')
        process.exit(0);
      }
    })
  })
})
