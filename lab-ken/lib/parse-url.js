'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querysting').parse;

module.exports = function(req) {
  req.url = parseUrl(req.url);
  req.url.qyery = parseQuery(req.url.query);
  return Promise.resolve(req);
};