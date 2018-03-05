Welcome to my simple single resource goblin API.

#Install
To install, clone down this git repository to your machine and cd into that directory.  
In your terminal, enter npm i to install all the dependencies of this application.  
To initiate your server connection, enter npm run start. Your server should be up. 

#Endpoints

Make a GET request with the id of the goblin you'd like.
GET: localhost:3000/api/goblin/?id=${goblin.id}

Make a POST request with the name and type of goblin you'd like to add to the file system.
POST: localhost:3000/api/goblin


