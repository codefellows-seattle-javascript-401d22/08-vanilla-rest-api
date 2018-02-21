'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  
  console.log('req.url',req.url);
  console.log('req.url.query',req.url.query);

  return Promise.resolve(req);
};