require('should');
const express = require('express');
const request = require('supertest');
const app = require('../../app');
const constant = require('../../config/constant');
const Cart = require('../../model/cart');

describe('CartController',() => {
  it('GET /cart should return all cart', (done) => {
    request(app)
        .get('/cart')
        .expect(constant.httpCode.OK)
        .expect((res) => {
          res.body.totalCount.should.equal(1);
        })
        .end(done);
  });

  it('GET /cart should return one cart', (done) => {
    request(app)
        .get('/cart/587f0f2586653d19297d40c6')
        .expect(constant.httpCode.OK)
        .expect((res) => {
          res.body.should.eql({
            "_id": "587f0f2586653d19297d40c6",
            "userId": "1",
            "__v": 0,
            "items": [{
              "uri": "items/587f0f2586653d19297d40c2",
              "count": 1
            }]
          })
        })
        .end(done);
  });

  it('POST /cart should return item uri', (done) => {
    const cart = {
      userId: '2',
      items: [
        {
          count: 4,
          item: '587f0f2586653d19297d40c2'
        }
      ]
    };
    request(app)
        .post('/cart')
        .send(cart)
        .expect(constant.httpCode.CREATED)
        .expect((res) => {
          Cart.findOne(cart, (err, doc) => {
            res.body.should.eql({uri: `carts/${doc._id}`});
          });
        })
        .end(done);
  })


  xit('DELETE /cart should delete cart', (done) => {
    request(app)
        .delete('/cart/587f0f2586653d19297d40c6')
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  });

  it('PUT /cart should update item', (done) => {
    const cart = {
      userId: '9',
      items: [
        {
          count: 4,
          item: '587f0f2586653d19297d40c2'
        }
      ]
    };
    request(app)
        .put('/cart/587f0f2586653d19297d40c6')
        .send(cart)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  })
});