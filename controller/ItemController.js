const Item = require('../model/item');
const constant = require('../config/constant');
const async = require('async');

class ItemController {
  getAll(req, res, next) {
    async.series({
      items: (cb) => {
        Item.find({})
            .populate('categoryId')
            .exec(cb)
      },
      totalCount: (cb) => {
        Item.count(cb)
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    const itemId = req.params.itemId;
    Item.findById(itemId)
        .populate('categoryId')
        .exec((err, docs) => {
          if (err) {
            return next(err);
          }
          if (!docs) {
            return res.sendStatus(constant.httpCode.NOT_FOUND);
          }
          return res.status(constant.httpCode.OK).send(docs);
        })
  }

  delete(req, res, next) {
    Item.findOneAndRemove({_id: req.params.itemId}, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  create(req, res, next) {
    Item.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `items/${doc._id}`});
    });
  }

  update(req, res, next) {
    const itemId = req.params.itemId;
    Item.findOneAndUpdate({_id: itemId}, {$set: req.body}, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT)
    });
  }
}

module.exports = ItemController;
