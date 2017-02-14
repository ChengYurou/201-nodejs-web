const Category = require('../model/category');
const Item = require('../model/item');
const constant = require('../config/constant');
const async = require('async');

class CategoryController {
  getAll(req, res, next) {
    async.series({
      items: (cb) => {
        Category.find({}, cb);
      },
      totalCount: (cb) => {
        Category.count(cb);
      }

    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, docs) => {
      if (err) {
        return next(err);
      }
      if (!docs) {
        return res.sendStatus(constant.httpCode.NOT_FOUND)
      }
      return res.status(constant.httpCode.OK).send(docs);
    })
  }

  delete(req, res, next) {
    const categoryId = req.params.categoryId;
    async.waterfall([
      (done) => {
        Item.find({categoryId}, done);
      },
      (doc, done) => {
        if (doc) {
          return done(true, null);
        }
        Category.findOneAndRemove({_id: category}, done)
      }
    ], (err,doc) => {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT)
    })
  }

  create(req, res, next) {
    Category.create(req.body, (err, docs) => {
      if (err) {
        return next(err);
      }
      res.status(constant.httpCode.CREATED).send({uri: `categories/${docs._id}`})
    })
  }

  update(req, res, next) {
    Category.findOneAndUpdate({_id: req.params.categoryId}, req.body, (err, docs) => {
      if (err) {
        return next(err);
      }
      if (!docs) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT)
    })
  }
}

module.exports = CategoryController;