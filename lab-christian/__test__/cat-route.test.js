'use strict';

const request = require('superagent');
require('jest');
require('../server.js');


describe('cat routes', function() {
  var cat = null;
  describe('POST: /api/cat', function() {
    it('should return a cat', function(done) {
      request.post('localhost:3000/api/cat')
        .send( { name: 'marco', color: 'black' })
        .end((err, res) => {
          if (err) return done(err);
          cat = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(cat.name).toEqual('marco');
          expect(cat.color).toEqual('black');
          done();
        });
    });
    it('should return with a 400-bad request if no request body was provided', function(done) {
      request.post('localhost:3000/api/cat')
        .send( { name: 'not marco' } )
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });
  });

  describe('GET: /api/cat', function() {
    it('should return a cat', function(done) {
      request.get(`localhost:3000/api/cat?id=${cat.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(cat.name).toEqual('marco');
          expect(cat.color).toEqual('black');
          done();
        });
    });
    it('should return with a 404 for an invalid request', function(done) {
      request.get(`localhost:3000/api/cat?id=wqweqwe`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should return with a 400 for an id that isnt found', function(done) {
      request.get(`localhost:3000/api/notcat?id=12345`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });
});
