# Single-resource API

This is a simple, single-resource API utilizing a RESTful  architectural style. It can perform CRUD functions at the route `localhost:3000/api/beer`. POST, PUT, and DELETE functions will need the id of the object passd into the query string, it should look like `localhost:3000api/beer?id=<beerID>`

### Beer Constructor 

The beer contructor accepts `{ name: <beername>, style:<beerstyle>}`, and instaniates a beer object which will be stored within an in-app persistance layer until it is deleted or the server is shut off.







### Dependencies 

This API uses a few different dependencies, **uuid**, **superagent**, and **jest**(for testing). Run `npm i` to download them before running the server.

