'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('Expected schema name'));
  if (!item) return Promise.reject(new Error('Expected item'));
  if (!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('Expected schema name'));
    if (!id) return reject(new Error('Expected id'));

    /* DOUBLE CHECK */
    if (!storage[schemaName]) return reject(new Error('Schema not found'));
    if (!storage[schemaName][id]) return reject(new Error('Schema id not found'));

    resolve(storage[schemaName][id]);
  });
};