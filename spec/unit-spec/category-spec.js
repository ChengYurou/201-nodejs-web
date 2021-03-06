require('should');
const express = require('express');
const request = require('supertest');
const constant = require('../../config/constant');
const app = require('../../app');
const Category = require('../../model/category');

describe('CategoryController', () => {
  it('GET /category should return all category', (done) => {
    request(app)
        .get('/category')
        .expect(constant.httpCode.OK)
        .expect((res) => {
          res.body.totalCount.should.equal(1);
        })
        .end(done);
  });

  it('GET /category should return one item', (done) => {
    request(app)
        .get('/category/587f0f2586653d19297d40c8')
        .expect(constant.httpCode.OK)
        .expect((res) => {
          res.body.should.eql({
            "_id": "587f0f2586653d19297d40c8",
            "name": "文具",
            "__v": 0
          })
        })
        .end(done);
  });

  it('POST /category should return item uri', (done) => {
    const category = {
      name: 'test category',
    };
    request(app)
        .post('/category')
        .send(category)
        .expect(constant.httpCode.CREATED)
        .expect((res) => {
          const result = /^categories\/(.*)$/.test(res.body.uri);
          result.should.eql(true);
        })
        .end(done);
  });


  it('DELETE /category should delete item', (done) => {
    request(app)
        .delete('/category/587f0f2586653d19297d40c8')
        .expect(constant.httpCode.BAD_REQUEST)
        .end(done);
  });

  it('PUT /category should update item', (done) => {
    const category = {
      name: 'test category',
    };
    request(app)
        .put('/category/587f0f2586653d19297d40c8')
        .send(category)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  })
});