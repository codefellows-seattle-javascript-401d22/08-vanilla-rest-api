'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Doggo Routes', function() {
  var doggo = null;
   
  describe('POST: /api/doggo', function() {
    it('should return a doggo', function(done) {
      request.post('localhost:3000/api/doggo')
        .send( { name: 'Chloe', breed: 'Pitbull/Australian Shepherd', favActivity: 'fetch' })
        .end((err, res) => {
          if(err) return done(err);
          doggo = JSON.parse(res.text);
          console.log('doggo', doggo);
          expect(res.status).toEqual(200);
          expect(doggo.name).toEqual('Chloe');
          expect(doggo.breed).toEqual('Pitbull/Australian Shepherd');
          expect(doggo.favActivity).toEqual('fetch');
          done();
        });
    });
    it('should return a 400 when a bad request was made', function(done) {
      request.post('localhost:3000/api/doggo')
        .send( { name: 'Chloe' } )
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });
  });

  describe('GET: /api/doggo', function() {
    it('should return a doggo', function(done) {
      request.get(`localhost:3000/api/doggo?id=${doggo.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          let response = JSON.parse(res.text);
          console.log('response.name', response.name);
          expect(response.name).toEqual('Chloe');
          expect(response.breed).toEqual('Pitbull/Australian Shepherd');
          expect(response.favActivity).toEqual('fetch');
          done();
        });
    });
    it('should return a 404 when incorrect ID is provided', function(done) {
      request.get(`localhost:3000/api/doggo?id=123456789`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('route not found');
          done();
        });
    });
    it('should return a 400 when no ID is provided', function(done) {
      request.get('localhost:3000/api/doggo?id=')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });
  });

  describe('DELETE: /api/doggo', function() {
    it('should remove a doggo from the pupHouse', function(done) {
      request.delete(`localhost:3000/api/doggo?id=${doggo.id}`)
        .end((err, res) => {
          expect(res.status).toEqual(204);
          done();
        });
    });
  });
});