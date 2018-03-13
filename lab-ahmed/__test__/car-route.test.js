'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Car routes', function(){
  var car = null;

  describe('POST: /api/car', function(){
    it('should respond with the body content for a post request with a valid body', function(done){
      request.post('localhost:3000/api/car')
        .send({name: 'test name', content: 'test content'})
        .end((err,res) => {
          if (err) return done(err);
          car = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(car.name).toEqual('test name');
          expect(car.content).toEqual('test content');
          done();
        });
    });
    it('should return bad request if no request body was provided', function(done){
      request.post('localhost:3000/api/car')
        .send({name: '', content: ''})
        .end((err,res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
  describe('GET: /api/car', function(){
    it('should contain a response body for a request made with a valid id', function(done){
      request.get(`localhost:3000/api/car?id=${car.id}`)
        .end((err, res) => {
          if(err) return done(err);
          car = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(car.name).toEqual('test name');
          expect(car.content).toEqual('test content');
          done();
        });
    });
    it('should respond with an id that was not found', function(done){
      request.get('localhost:3000/api/car?id=abc')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should respond with bad request if no id was provided in the request', function(done){
      request.get('localhost:3000/api/car')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
});