'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, breed, favActivity) {
  if (!name) throw new Error('expected name');
  if (!breed) throw new Error('expected breed');
  if (!favActivity) throw new Error('expected favorite activity');

  this.id = uuidv4();
  this.name = name;
  this.breed = breed;
  this.favActivity = favActivity;
};