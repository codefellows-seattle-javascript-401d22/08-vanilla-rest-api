'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const catRoutes = require('./route/cat-route.js');


const PORT = process.env.PORT || 3000;
const router = new Router();


catRoutes(router);
const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`Server up on PORT ${PORT}`);
});