import Cart from '../model/cart';
import Item from '../model/item'
import async from 'async';

export default class CartController {
  getAll(req, res, next) {
    Cart.find({}, (err, docs) => {
      if (err) {
        next(err);
      }
      res.send(docs);
    })
  }

  createCart(req, res, next) {
    Cart.create(req.body, (err, docs) => {
      if (err) {
        next(err);
      } else {
        res.sendStatus(201);
      }
    })
  }

  updateCart(req, res, next) {
    Cart.update({_id: req.params.cartId}, {$set: req.body}, (err, docs) => {
      if (err) {
        next(err);
      }
      res.sendStatus(204)
    })
  }

  deleteCart(req, res, next) {
    Cart.remove({_id: req.params.cartId}, (err, docs) => {
      if (err) {
        next(err);
      }
      res.sendStatus(204)
    })
  }

  addNewItemToCart(req, res, next) {
    const cartId = req.params.cartId;
    async.waterfall([
      (done) => {
        Item.create(req.body, (err, docs) => {
          done(err, docs);
        })
      },
      (doc, done) => {
        Cart.findOne({_id: cartId}, (err, docs) => {
          docs.items.push(doc._id);
          docs.save(done);
        })
      }
    ], (err, doc) => {
      if (err) {
        next(err);
      } else {
        res.sendStatus(201);
      }
    })
  }

  addOldItemToCart(req, res, next) {
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;
    Cart.findOne({_id: cartId}, (err, docs) => {
      if (err) {
        next(err);
      } else {
        docs.items.push(itemId);
        docs.save();
        res.sendStatus(204)
      }
    })
  }

  removeItemFromCart(req, res, next) {
    const itemId = req.params.itemId;
    const cartId = req.params.cartId;
    Cart.findOne({_id: cartId}, (err, docs) => {
      const itemIndex = docs.items.indexOf(itemId);
      docs.items.splice(itemIndex, 1);
      docs.save();

      res.sendStatus(204);
    })
  }
}