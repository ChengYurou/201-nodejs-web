const Cart = require('../model/cart');
const constant = require('../config/constant');
const async = require('async');

const loadItem = (items) => {
  const result = items.map(({count, item}) => {
    return {uri: `items/${item}`, count};
  });

  return result;
};

class CartController {

  getAll(req, res, next) {
    async.series({
      items: (cb) => {
        Cart.find({}, (err, docs) => {
          if (err) {
            return next(err);
          }
          let carts = docs.map((cart) => {
            let data = cart.toJSON();
            data.items = loadItem(data.items);

            return data;
          });

          cb(null, carts);
        })
      },
      totalCount: (cb) => {
        Cart.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findById(cartId, (err, docs) => {
      if (err) {
        return next(err);
      }
      if (!docs) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      let data = docs.toJSON();
      data.items = loadItem(data.items);
      res.status(constant.httpCode.OK).send(data);
    })
  }

  delete(req, res, next) {
    Cart.findOneAndRemove({_id: req.params.cartId}, (err, docs) => {
      if (err) {
        return next(err);
      }
      if (!docs) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  create(req, res, next) {
    Cart.create(req.body, (err, docs) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `carts/${docs._id}`});
    })
  }

  update(req, res, next) {
    Cart.findOneAndUpdate({_id: req.params.cartId}, req.body, (err, docs) => {
      if (err) {
        return next(err);
      }
      if (!docs) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }

      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }
}

module.exports = CartController;