require('should');
const express = require('express');
const request = require('supertest');
const app = require('../../app');
const constant = require('../../config/constant');
const Item = require('../../model/item');

describe('ItemController', ()=> {
  it('GET /items should return all items', (done) => {
    request(app)
        .get('/items')
        .expect(constant.httpCode.OK)
        .expect((res) => {
          res.body.totalCount.should.equal(1);
        })
        .end(done);
  });

  it('GET /items should return one item', (done) => {
    request(app)
        .get('/items/587f0f2586653d19297d40c2')
        .expect(constant.httpCode.OK)
        .expect((res) => {
          res.body.should.eql({
            "_id": "587f0f2586653d19297d40c2",
            "name": "钢笔",
            "price": 12,
            "categoryId": {
              "_id": "587f0f2586653d19297d40c8",
              "name": "文具",
              "__v": 0
            },
            "__v": 0
          })
        })
        .end(done);
  });

  it('POST /items should return item uri', (done) => {
    const item = {
      name: 'test',
      price: 45,
      category: '587f0f2586653d19297d40c8'
    };
    request(app)
        .post('/items')
        .send(item)
        .expect(constant.httpCode.CREATED)
        // .expect((res) => {
        //   Item.findOne(item, (err, doc) => {
        //     res.body.should.eql({uri: `items/${doc._id}`});
        //   });
        // })
        .end(done);
  })


  it('DELETE /items should delete item', (done) => {
    request(app)
        .delete('/items/587f0f2586653d19297d40c2')
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  });

  it('PUT /items should update item', (done) => {
    const item = {
      name: 'test',
      price: 45,
      category: '587f0f2586653d19297d40c8'
    };
    request(app)
        .put('/items/587f0f2586653d19297d40c2')
        .send(item)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  })
});
