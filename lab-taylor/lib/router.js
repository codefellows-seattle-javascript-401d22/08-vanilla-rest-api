'use strict';

const parseURL = require('./lib/parse-url.js');
const parseJSON = require('./lib/parse-json.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, cb) {
  this.routes.GET[endpoint] = cb;
};

Router.prototype.post = function(endpoint, cb) {
  this.routes.POST[endpoint] = cb;
};

Router.prototype.put = function(endpoint, cb) {
  this.routes.PUT[endpoint] = cb;
};

Router.prototype.delete = function(endpoint, cb) {
  this.routes.DELETE[endpoint] = cb;
};

Router.prototype.route = function() {
  return (req,res) => {
    Promise.all([
      parseURL(req),
      parseJSON(req),
    ])
      .then ( () => {
        if(typeof this.routes[req.method] === 'function') {
          this.routes[req.method][req.url.pathname](req,res);
          return;
        }

        console.error('route not found');

        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('route not found');
        res.end();
      })
      .catch( err => {
        console.error(err);

        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });

        res.write('bad request');
        res.end();
      });
  };
};
