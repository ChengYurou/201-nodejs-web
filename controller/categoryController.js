import Category from '../model/category';
import Item from '../model/item';
import async from 'async';

export default class CategoryController {
  getAll(req, res, next) {
    Category.find({}, (err, doc) => {
      if (err) {
        next(err);
      } else {
        res.send(doc);
      }
    })
  }

  getOneCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findOne({_id: categoryId})
        .populate('Item')
        .exec((err, doc) => {
          if (err) {
            next(err);
          }
          res.send(doc);
        });
  }

  createCategory(req, res, next) {
    Category.create(req.body, (err, doc) => {
      if (err) {
        next(err);
      } else {
        res.sendStatus(201);
      }
    })
  }

  updateCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.update({_id: categoryId}, {$set: req.body}, (err, doc) => {
      if (err) {
        next(err);
      } else {
        res.sendStatus(204);
      }
    })
  }

  deleteCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.remove({_id: categoryId}, (err, doc) => {
      if (err) {
        next(err);
      } else {
        res.sendStatus(204);
      }
    })
  }

  addItemToCategory(req, res, next) {
    const categoryId = req.params.categoryId;

    async.waterfall([
      (done) => {
        Item.create(req.body, (err, docs) => {
          done(err, docs);
        })
      },
      (doc, done) => {
        Category.findOne({_id: categoryId}, (err, docs) => {
          if (err) {
            done(err, docs);
          }
          docs.items.push(doc._id);
          docs.save(done);
        })
      }
    ], (err, doc) => {
      if (err) {
        return next(err);
      }

      return res.sendStatus(201);
    })
  }

  updateItemInCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    const itemId = req.params.itemId;

    async.waterfall([
      (done) => {
        Category.findOne({'items': itemId}, done);
      },
      (doc, done) => {
        if (doc) {
          let itemIndex = doc.items.indexOf(itemId);
          doc.items.splice(itemIndex, 1);
          doc.save((err, docs) => {
            done(err, doc);
          });

        } else {
          done(null, null);
        }
      },
      (doc, done) => {
        Category.findOne({_id: categoryId}, (err, docs) => {
          docs.items.push(itemId);
          docs.save(done);
        });
      }
    ], (err, doc) => {
      if (err) {
        return next(err);
      } else {
        return res.sendStatus(204);
      }
    })
  }

  removeItemFromCategory(req, res, next) {
    const itemId = req.params.itemId;

    async.waterfall([
      (done) => {
        Category.findOne({'items': itemId}, done);
      },
      (doc, done) => {
        if (doc) {
          let itemIndex = doc.items.indexOf(itemId);
          doc.items.splice(itemIndex, 1);
          doc.save((err, docs) => {
            done(err, doc);
          })
        } else {
          done(null, null);
        }
      }
    ], (err, doc) => {
      if (err) {
        return next(err);
      } else {
        res.sendStatus(204);
      }
    })
  }
}