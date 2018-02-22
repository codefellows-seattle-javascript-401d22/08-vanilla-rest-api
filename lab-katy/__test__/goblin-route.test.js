'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Goblin Routes', function(){
  var goblin = null;

  describe('POST: api/goblin', function(){
    it('should return a goblin', function(done){
      request.post('localhost:3000/api/goblin')
        .send({name: 'test name', type: 'test type'})
        .end((err, res) => {
          if (err) return done(err);
          goblin = JSON.parse(res.text);
          // console.log('res', res);
          // console.log('res text', res.text);
          // console.log('goblin', goblin);
          expect(res.status).toEqual(200);
          expect(goblin.name).toEqual('test name');
          expect(goblin.type).toEqual('test type');
          done();
        });
    });
    it('should return a 400 status', function(done){
      request.post('localhost:3000/api/goblin')
        .send({name: '', type: ''})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET: /api/goblin', function(){
    it('should return a goblin', function(done){
      request.get(`localhost:3000/api/goblin?id=${goblin.id}`)
        .end((err, res) => {
          if(err) return done(err);
          goblin = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(goblin.name).toEqual('test name');
          expect(goblin.type).toEqual('test type');
          done();
        });
    });
    it('should return 404 status', function(done){
      request.get(`localhost:3000/api/goblin?id=1`)
        .end((err, res) => {
          // if(err) return done(err);
          // console.error('ERROR 404', err);
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should return 400 status', function(done){
      request.get(`localhost:3000/api/goblin?id=`)
        .end((err, res) => {
          // if(err) return done(err);
          // console.error('ERROR 400', err);
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
});