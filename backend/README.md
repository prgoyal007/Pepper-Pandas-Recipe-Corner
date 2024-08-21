# Packages and Instructions needed for Backend, Database, and Spoonacular API Initialization

1. Once you reclone the repository run these commands in the backend folder: 
```
yarn init -y 
yarn add argon2, cors, axios, dotenv, express, jsonwebtoken, mongoose, nodemon
```

2. Then, go to the package.json file and paste this after the curly bracket marking the end of the dependencies portion 
```
,
  "scripts": {
    "start": "nodemon ./server.js"
  }
```
3. Next, 
```
PORT=3000
SECRET="8aJaDbI6DtHof5jvDD75J23HSo923hIU3298dn"
MONGO_URI="mongodb+srv://<username>:<password>@recipeapp.avdvskp.mongodb.net/recipeapp?retryWrites=true&w=majority&appName=recipeapp"
SPOONACULARAPI=<your spoonacular api key>
```

4. Finally
