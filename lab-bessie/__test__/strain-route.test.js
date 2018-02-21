'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Strain Routers', function() {
  var strain = null;
  describe('POST: /api/strain', function () {
    it('should return a strain', function (done) {
      request.post('localhost:3000/api/strain')
        .send({ name: 'test name', content: 'test content' })
        .end((err, res) => {
          if(err) return done(err);
          strain = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(strain.name).toEqual('test name');
          expect(strain.content).toEqual('test content');
          done();
        });
    });
  });
  describe('GET: /api/strain', function() {
    it('should return a strain', function(done) {
      request.get(`localhost:3000/api/strain?id=${strain.id}`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(strain.name).toEqual('test name');
          expect(strain.content).toEqual('test content');
        });
      done();
    });
  });
});
