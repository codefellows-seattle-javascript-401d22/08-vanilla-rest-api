'use strict';

const http = require('http');
const Strain = require('./model/strain.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/strain', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('strain', req.url.query.id)
      .then(strain => {
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.write(JSON.stringify(strain));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('route not found');
        res.end();
      });

    return;
  }
  res.writeHead(400, {'Content-Type':'text/plain'});
  res.write('bad request');
  res.end();
});

router.delete('/api/strain', function(req,res) {
  if(req.url.query.id) {
    storage.deleteItem('strain', req.url.query.id);
    res.writeHead(204, {'Content-Type': 'text/plain'});
    return;
  }
});

router.post('/api/strain', function(req, res) {
  try {
    var strain = new Strain(req.body.name, req.body.type);
    storage.createItem('strain', strain);
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.write(JSON.stringify(strain));
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {'Content-Type':'text/plain'});
    res.write('bad request');
    res.end();
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('Sever up on', PORT);
});