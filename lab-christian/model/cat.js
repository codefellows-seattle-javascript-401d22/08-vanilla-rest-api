'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, color) {
  if (!name) throw new Error('expected name');
  if (!color) throw new Error('expected color');

  this.id = uuidv4();
  this.name = name;
  this.color = color;
};