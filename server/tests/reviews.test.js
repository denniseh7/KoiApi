const request = require('supertest');
const express = require('express');
require('dotenv').config();
const router = require('../router');
const { sql } = require('../db');

// create a test server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/reviews', router);
const testServer = app.listen(3001);

// product_id for testing
const productId = 40344;

afterAll(async () => {
  await testServer.close();
  await sql.end();
});

describe('api endpoints are running correctly', () => {
  test('responds to get request properly', async () => {
    const res = await request(app)
      .get('/reviews')
      .query({ product_id: productId });
    expect(res.statusCode).toBe(200);
  });
});

describe('api endpoints return correct data shape', () => {
  test('reviews endpoint returns correct shape', async () => {
    const resKeys = ['product', 'page', 'count', 'results'];
    const reviewKeys = ['review_id', 'rating', 'summary', 'recommend',
      'response', 'body', 'date', 'reviewer_name', 'helpfulness', 'photos'];
    const photoKeys = ['id', 'url'];

    // check keys
    const hasKeys = (arr, obj) => {
      const objKeys = Object.keys(obj);
      return arr.every((ele) => objKeys.includes(ele));
    };
    const res = await request(app)
      .get('/reviews')
      .query({ product_id: productId });
    expect(typeof res.body).toBe('object');
    expect(res.body.product).toBe(productId.toString());
    expect(hasKeys(resKeys, res.body)).toBeTruthy();
    expect(hasKeys(reviewKeys, res.body.results[0])).toBeTruthy();
    expect(hasKeys(photoKeys, res.body.results[0].photos[0])).toBeTruthy();
  });
});
