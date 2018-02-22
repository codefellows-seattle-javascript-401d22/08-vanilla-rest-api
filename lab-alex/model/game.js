'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, desc, genre) {
  if(!name) throw new Error('expected name');
  if(!desc) throw new Error('expected description');
  if(!genre) throw new Error('expected genre');

  this.id = uuidv4();
  this.name = name;
  this.desc = desc;
  this.genre = genre;
};