'use strict';

const http = require('http');
const Doggo = require('./model/doggo.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/doggo', function(req, res) {
  console.log('req.url.query.id', req.url.query.id);
  if(req.url.query.id) {
    storage.fetchDoggo('doggo', req.url.query.id)
      .then( doggo => {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(JSON.stringify(doggo));
        res.end();
      })
      .catch( err => {
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('route not found');
        res.end();
        console.error('err', err);
      });
    return;
  }

  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

router.delete('/api/doggo', function(req, res) {
  console.log('router delete res.url', req.url);
  storage.adoptDoggo('doggo', req.url.query.id);
  console.log(req.url.query.id);
  res.writeHead(204, {
    'Content-Type': 'text/plain',
  });
  res.end();
});

router.post('/api/doggo', function(req, res) {
  try {
    var doggo = new Doggo(req.body.name, req.body.breed, req.body.favActivity);
    console.log('var doggo in server.js', doggo);
    storage.addDoggo('doggo', doggo);
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write(JSON.stringify(doggo));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`The server is now listening on PORT ${PORT}! You go girl!`);
});