const assert = require('assert');
const express = require('./express-server');
const koa = require('./koa-server');
const request = require('request');


/*
 *
 * express test
 *
 *
 *
 */
describe('express', function() {
  before(function () {
    express.listen(8000);
  });

  describe('simple-url', function() {
    it('/simple-url', (done) => {
      request('http://localhost:8000/simple-url', (e, res, body) => {
        assert.equal(200, res.statusCode);
        assert(body, `<!DOCTYPE html><html><title>simple-url</title></html><body><p>simple-url</p></body>`);
        done();
      });
    })
  });

  describe('multi-urls', function() {
    it('/multi-urls/a', (done) => {
      request('http://localhost:8000/multi-urls/a', (e, res, body) => {
        assert.equal(200, res.statusCode);
        assert.equal(body, `<!DOCTYPE html><html><title>multi-urls</title></html><body><p>multi-urls</p></body>`);
        done();
      });
    })

    it('/multi-urls/b', (done) => {
      request('http://localhost:8000/multi-urls/b', (e, res, body) => {
        assert.equal(200, res.statusCode);
        assert.equal(body, `<!DOCTYPE html><html><title>multi-urls</title></html><body><p>multi-urls</p></body>`);
        done();
      });
    })
  });

  describe('params', (done) => {
    it('/params/id/name', (done) => {
      request('http://localhost:8000/params/id/name', (e, res, body) => {
        assert.equal(200, res.statusCode);
        assert.equal(body, `<!DOCTYPE html><html><title>params</title></html><body><p>id</p><p>name</p></body>`);
        done();
      });
    })

    it('/params/a/b', (done) => {
      request('http://localhost:8000/params/a/b', (e, res, body) => {
        assert.equal(200, res.statusCode);
        assert.equal(body, `<!DOCTYPE html><html><title>params</title></html><body><p>a</p><p>b</p></body>`)
        done();
      });
    })
  })
});

/*
 *
 * koa2 test
 *
 *
 *
 */
describe('koa2', function() {
  before(function () {
    koa.listen(8001);
  });

  describe('simple-url', function() {
    it('/simple-url', (done) => {
      request('http://localhost:8001/simple-url', (e, res, body) => {
        assert.equal(200, res.statusCode);
        assert(body, `<!DOCTYPE html><html><title>simple-url</title></html><body><p>simple-url</p></body>`);
        done();
      });
    })
  });

  describe('multi-urls', function() {
    it('/multi-urls/a', (done) => {
      request('http://localhost:8001/multi-urls/a', (e, res, body) => {
        assert.equal(200, res.statusCode);
        assert.equal(body, `<!DOCTYPE html><html><title>multi-urls</title></html><body><p>multi-urls</p></body>`);
        done();
      });
    })

    it('/multi-urls/b', (done) => {
      request('http://localhost:8001/multi-urls/b', (e, res, body) => {
        assert.equal(200, res.statusCode);
        assert.equal(body, `<!DOCTYPE html><html><title>multi-urls</title></html><body><p>multi-urls</p></body>`);
        done();
      });
    })
  });

  describe('params', (done) => {
    it('/params/id/name', (done) => {
      request('http://localhost:8001/params/id/name', (e, res, body) => {
        assert.equal(200, res.statusCode);
        assert.equal(body, `<!DOCTYPE html><html><title>params</title></html><body><p>id</p><p>name</p></body>`);
        done();
      });
    })

    it('/params/a/b', (done) => {
      request('http://localhost:8001/params/a/b', (e, res, body) => {
        assert.equal(200, res.statusCode);
        assert.equal(body, `<!DOCTYPE html><html><title>params</title></html><body><p>a</p><p>b</p></body>`)
        done();
      });
    })
  })
});
