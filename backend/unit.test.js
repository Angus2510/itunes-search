const axios = require('axios');
const { expect } = require('chai');
const sinon = require('sinon');
const express = require('express');
const supertest = require('supertest');

const app = express();
const request = supertest(app);

const router = require('./routes/all');

// Mount the router on the app
app.use('/', router);

describe('GET /search', () => {
  let axiosGetStub;

  before(() => {
    // Stub the axios.get function to return a mock response
    axiosGetStub = sinon.stub(axios, 'get').resolves({
      data: {
        results: ['mockResult1', 'mockResult2'],
      },
    });
  });

  after(() => {
    // Restore axios.get function after the tests
    axiosGetStub.restore();
  });

  it('should return search results for all media types', async () => {
    const searchTerm = 'test';
    const mediaType = 'all';

    const expectedUrl = `https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}`;
    const expectedData = ['mockResult1', 'mockResult2'];

    const response = await request.get('/search').query({ term: searchTerm, media: mediaType });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(expectedData);

    sinon.assert.calledOnce(axiosGetStub);
    sinon.assert.calledWith(axiosGetStub, expectedUrl);
  });

  it('should return 400 for invalid media type', async () => {
    const searchTerm = 'test';
    const mediaType = 'invalidMediaType';

    const response = await request.get('/search').query({ term: searchTerm, media: mediaType });

    expect(response.status).to.equal(400);
    expect(response.text).to.equal('Invalid media type');

    sinon.assert.notCalled(axiosGetStub);
  });

  it('should return 500 for server error', async () => {
    const searchTerm = 'test';
    const mediaType = 'all';

    // Reject the axios.get promise to simulate a server error
    axiosGetStub.rejects(new Error('Server error'));

    const response = await request.get('/search').query({ term: searchTerm, media: mediaType });

    expect(response.status).to.equal(500);
    expect(response.text).to.equal('Server error');

    sinon.assert.calledOnce(axiosGetStub);
  });
});
