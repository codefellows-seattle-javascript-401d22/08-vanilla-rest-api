'use strict';

const pupHouse = {};

module.exports = exports = {};

exports.addDoggo = function(schemaName, doggo) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if (!doggo) return reject(new Error('expected doggo'));

    if (!pupHouse[schemaName]) pupHouse[schemaName] = {};

    pupHouse[schemaName][doggo.id] = doggo;

    return resolve(doggo);
  });
};

exports.fetchDoggo = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));
    if (!pupHouse[schemaName]) return reject(new Error('schema not found'));
    if (!pupHouse[schemaName][id]) return reject(new Error('item not found'));

    resolve(pupHouse[schemaName][id]);
  });
};

exports.adoptDoggo = function(schemaName, id) {
  console.log(pupHouse[schemaName][id]);
  delete pupHouse[schemaName][id];
  console.log('pup house after deletion', pupHouse);
};