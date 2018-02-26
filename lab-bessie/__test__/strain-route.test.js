'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Strain Routers', function() {
  var strain = null;
  
  describe('POST: /api/strain', function () {
    it('should return a strain', function (done) {
      request.post('localhost:3000/api/strain')
        .send({ name: 'test name', type: 'test type' })
        .end((err, res) => {
          if(err) return done(err);
          strain = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(strain.name).toEqual('test name');
          expect(strain.type).toEqual('test type');
          done();
        });
    });

    it('should return a 400 error', function(done) {
      request.post('localhost:3000/api/strain')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET: /api/strain', function() {
    it('should return a strain', function(done) {
      request.get(`localhost:3000/api/strain?id=${strain.id}`)
        .end((err,res) => {
          strain = JSON.parse(res.text);
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(strain.name).toEqual('test name');
          expect(strain.type).toEqual('test type');
          done();
        });
    });

    it('should return a 400 error', function(done) {
      request.get('localhost:3000/api/strain')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });

    it('should return a 404 error', function(done) {
      request.get('localhost:3000/api/strain?id=0000')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });
});
