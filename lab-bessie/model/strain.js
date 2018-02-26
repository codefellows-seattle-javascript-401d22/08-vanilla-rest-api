'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, type) {
  if(!name) throw new Error('expected name');
  if(!type) throw new Error('expected type');

  this.id = uuidv4();
  this.name = name;
  this.type = type;
};