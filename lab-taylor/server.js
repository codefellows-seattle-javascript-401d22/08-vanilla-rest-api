'use strict';

const http = require('http');
const Beer = require('./model/beer.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/beer', function(req,res) {
  if(req.url.query.id) {
    storage.fetchItem('beer', req.url.query.id)
      .then( beer => {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(JSON.stringify(beer));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('route not found');
        res.end();
      });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

router.post('/api/beer', function(req,res) {
  try {
    var beer = new Beer(req.body.name, req.body.style);
    storage.createItem('beer', beer);
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write(JSON.stringify(beer));
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/beer', function(req,res) {
  if(req.url.query.id) {
    storage.deleteItem('beer', req.url.query.id)
      .then( () => {
        res.writeHead(204, {
          'Content-Type': 'text/plain',
        });
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('route not found');
        res.end();
      });
    return;
  }  
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
  
      
  
    



