### Vanilla Rest API

This code creates a vanilla RESTful API from scratch. It uses the native 'http', 'uuidv4', 'querystring', and 'url' native Node modules. The router handles PUT, POST, DELETE, and GET commands. The storage module organizes by schema. Each schema is an object containing instances of the object, organied by ID. In the case of this file, for testing purposes I have created a 'doggo' schema, each doggo being an object with an ID, a name, breed, and favorite activity. 

To retreive (or GET) a doggo, use the following route:
```
localhost:3000/api/doggo?id=${doggo.id}
```
If a valid ```${doggo.id}``` is provided, the server will respond with a status of **200**, or a valid doggo was found.

Note: 
  - If no ```${doggo.id}``` is provided, the server will respond with a **400**, or 'bad request'.
  - If an incorrect ```${doggo.id}``` is provided, the server will respond with a **404**, or 'not found'.

To add (PUT or POST) a doggo, use the following route:
```
localhost:3000/api/doggo
```
The doggo constructor accepts doggos in the form of: 

``` { name: name, breed: breed, favActivity: favActivity } ```

If a valid doggo is added to the storage, the server will respond with a status of **200**.

Note:
  - If an invalid request is made, the server will respond with a status of **400**, or 'bad request'.

To adopt (or DELETE) a doggo, use the following route:
```
localhost:3000/api/doggo?id=${doggo.id}
```
With ```${doggo.id}``` being the ID of the doggo you would like to delete.