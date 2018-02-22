'use strict';

const http = require('http');
const Game = require('./model/game.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/game', function (req, res) {
  if (req.url.query.id) {
    storage.fetchItem('game', req.url.query.id)
      .then(game => {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(JSON.stringify(game));
        res.end();
      })
      .catch(err => {
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
  res.end();
});

router.delete('/api/game', function (req, res) {
  if (req.url.query.id) {
    storage.deleteItem('game', req.url.query.id)
      .then(() => {
        res.writeHead(204, {
          'Content-Type': 'text/plain',
        });
        res.end();
      })
      .catch(err => {
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
});

router.post('/api/game', function (req, res) {
  try {
    var game = new Game(req.body.name, req.body.desc, req.body.genre);
    storage.createItem('game', game);
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write(JSON.stringify(game));
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
  console.log(`serve up: ${PORT}`);
});