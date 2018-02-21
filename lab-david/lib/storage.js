'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!item) return Promise.reject(new Error('expected item'));
  if(!storage[schemaName]) storage[schemaName] = {};
  
  storage[schemaName][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id){
  return new Promise((resolve,reject) => {
    if(!schemaName) return reject(new Error('expected schema name'));
    if(!id) return reject(new Error('expected id'));
    if(!storage[schemaName]) return reject(new Error('schema does not exist'));
    if(!storage[schemaName][id]) return reject(new Error('id does not exist'));
  
    return resolve(storage[schemaName][id]);
  });
};

exports.deleteItem = function(schemaName, id){
  return new Promise((resolve,reject) => {
    if(!schemaName) return reject(new Error('expected schema name'));
    if(!id) return reject(new Error('expected id'));
    if(!storage[schemaName]) return reject(new Error('schema does not exist'));
    if(!storage[schemaName][id]) return reject(new Error('id does not exist'));

    delete storage[schemaName][id];

    return resolve({ ans: `${schemaName} - ${id} has been deleted`});
  });
};