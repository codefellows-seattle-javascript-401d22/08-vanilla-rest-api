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
    })
  }
})


const server = http.createServer();

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})