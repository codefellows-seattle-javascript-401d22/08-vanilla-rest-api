# Lab 08: REST HTTP Server
## Installation
To run the application for the first time user should
npm i
npm start
To user can then access the server via a browser or CLI like HTTpie.

Connect to localhost:3000, and requests can be make.

## Functionality

There are 3 different routes defined for this app.

### Post
Will create a new object in storage by giving the server a file path and name of the thing being stored.  It will automatically generate an ID for this file so you can easily locate and distinguish it.

### Get
This will retrieve any file for the user by providing a filpath and the ID for the file they want.

### Delete
This will find a file the user wants and delete it by providing the filepath and name of the ID.


## Testing

To run the test suite the user should

npm test

The test suite will run.
