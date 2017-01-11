import Item from '../models/item';


export default class ItemController {
  getAll(req, res, next) {
    Item.find({}, (err, doc)=> {
      if (err) {
        throw err;
      } else {
        res.status(200).send(doc);
      }
    });
  }

  createItem(req, res, next) {
    Item.create(req.body, (err, doc) => {
      if (err) {
        throw err;
      } else {
        res.sendStatus(201);
      }
    });
  }

  getOneItem(req, res, next) {
    const id = req.params.id;
    Item.findOne({_id: id}, (err, doc) => {
      if (err) {
        throw err;
      } else {
        res.send(doc);
      }
    })
  }

  updateItem(req, res, next) {
    const id = req.params.id;
    Item.update({_id: id}, {$set: req.body}, (err, doc) => {
      if (err) {
        throw err;
      } else {
        res.send(204);
      }
    });
  }

  deleteItem(req, res, next) {
    const id = req.params.id;
    Item.remove({_id: id}, (err, doc) => {
      if (err) {
        throw err;
      } else {
        res.send(204);
      }
    })
  }
}
