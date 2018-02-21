'use strict';

//if you understand whats going on in this file, you basically know how express built thier router. study this shit.

const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},  //what other properties are on our objects here besides [endpoint]??
    POST: {}, 
    PUT: {}, 
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

