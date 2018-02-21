'use strict';

const http = require('http');
const Kitteh = require('./model/kitteh.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/kitteh', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('kitteh', req.url.query.id)
    .then( kitteh => {
      res.writeHead(200, { 'Content-Type' : 'text/plain' })
      res.write(JSON.stringify(kitteh));
      res.end()
    })
    .catch( err => {
      res.writeHead(404, { 'Content-Type' : 'text/plain' })
      res.write('Route not found');
      res.end();
    })
    return;
  }
  res.writeHead(400, { 'Content-Type' : 'text/plain' })
  res.write('Bad request.');
  res.end()
})

router.post('/api/kitteh', function(req, res) {
  try {
    let kitteh = new Kitteh(req.body.name, req.body.content);
    storage.createItem('kitteh', kitteh);
    res.writeHead(200, { 'Content-Type' : 'text/plain' })
    res.write(JSON.stringify(kitteh));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, { 'Content-Type' : 'text/plain' })
    res.write('Bad request');
    res.end();
  }
})

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})