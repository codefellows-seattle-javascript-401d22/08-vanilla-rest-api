'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Car routes', function(){
  var car = null;

  describe('POST: /api/car', function(){
    it('should return a car', function(done){
      request.post('localhost:3000/api/car')
        .send({name: 'test name', content: 'test content'})
        .end((err,res) => {
          if (err) return done(err);
          car = JSON.parse(res.text);
          console.log('res', res);
          console.log('res text', res.text);
          console.log('car', car);
          expect(res.status).toEqual(200);
          expect(car.name).toEqual('test name');
          expect(car.content).toEqual('test content');
          done();
        });
    });
  });
  describe('GET: /api/car', function(){
    it('should return a car', function(done){
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
  });
});