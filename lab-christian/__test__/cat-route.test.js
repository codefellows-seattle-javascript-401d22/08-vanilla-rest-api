'use strict';

const request = require('superagent');
require('jest');
require('../server.js');


describe('cat routes', function() {
  var cat = null;
  describe('POST: /api/cat', function() {
    it('should return a note', function(done) {
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
  });

  describe('GET: /api.cat', function() {
    it('should return a note', function(done) {
      request.get(`localhost:3000/api/cat?id=${cat.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(cat.name).toEqual('marco');
          expect(cat.color).toEqual('black');
          done();
        });
    });
  });
});
