'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Kitteh Routes', function() {
  let kitteh = null;

  describe('POST: api/kitteh', function() {
    it('should return a kitteh', function(done) {
      request.post(`localhost:3000/api/kitteh`)
        .send({ name: 'test kitteh name', content: 'test kitteh content' })
        .end((err, res) => {
          if (err) return done(err);
          kitteh = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(kitteh.name).toEqual('test kitteh name');
          expect(kitteh.content).toEqual('test kitteh content');
          expect(kitteh.says).toEqual('meow');
          done();
        });
    });
  });

  describe('GET: api/kitteh', function() {
    it('should return a kitteh', function(done) {
      request.get(`localhost:3000/api/kitteh?id=${kitteh.id}`)
        .end((err, res) => {
          if (err) return done(err);
          kitteh = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(kitteh.name).toEqual('test kitteh name');
          expect(kitteh.content).toEqual('test kitteh content');
          expect(kitteh.says).toEqual('meow');
          done();
        });
    });
  });

  describe('DELETE: api/kitteh', function() {
    it('should return a 404 error if id not found', function(done) {
      request.delete(`localhost:3000/api/kitteh?id=1`)
        .end((err, res) => {
          expect(res.status).toBe(404);
          expect(res.text).toEqual('Valid request, but id not found');
          done();
        });
    });
    it('should delete a kitteh', function(done) {
      request.delete(`localhost:3000/api/kitteh?id=${kitteh.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.text).toEqual('Kitteh is all gone');
          done();
        });
    });
  });
});