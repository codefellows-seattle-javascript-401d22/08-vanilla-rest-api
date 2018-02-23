'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, style) {
  if(!name) throw new Error('expected name');
  if(!style) throw new Error('expected style');

  this.id = uuid();
  this.name = name;
  this.style = style;
};