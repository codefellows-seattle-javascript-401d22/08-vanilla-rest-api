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
          console.log('POST: api/kitteh - kitteh:', kitteh);
          expect(res.status).toEqual(200);
          expect(kitteh.name).toEqual('test kitteh name');
          expect(kitteh.content).toEqual('test kitteh content');
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
          console.log('GET: api/kitteh - kitteh:', kitteh);
          expect(res.status).toEqual(200);
          expect(kitteh.name).toEqual('test kitteh name');
          expect(kitteh.content).toEqual('test kitteh content');
          done();
        });
    });
  });
});