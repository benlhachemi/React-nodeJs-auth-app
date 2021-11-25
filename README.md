# REACT + NodeJS Authentification App
## _BUILD WITH MERN STACK (MongoDB, ExpressJs, ReactJs, NodeJs)




## Installation



Run the server. (default port 4000)

```sh
cd ./server
npm run start
```




create a .env file in the root of the server and add those variables : 
```sh
DB_USER=YOUR MONGODB USERNAME
DB_PASSWORD=YOUR MONGODB PASSWORD
SESSION_SECRET_KEY=A SECRET KEY FOR THE SESSION
API_KEY=AN API KEY TO SECURE THE API
```

now open the package.json in the server directory and edit those variables : 
```sh
"react_host": "THE URL OF YOUR REACT APP (in dev env, you can keep it as it is localhost:3000)"
"database_name": "THE NAME OF YOUR MONGODB DATABASE"
"database_collection_name": "THE NAME OF THE COLLECTION IN YOUR MONGODB DATABASE"
```


Run the client side. (default port 3000)

```sh
cd ./client
npm start
```

create a .env file in the root of the client-side folder and add this variable : 
```sh
api_key=THE SAME API KEY THAT YOU USED IN THE SERVER .env FILE
```
## How it works
Now just enter to http://localhost:3000 and inspect element to see all the console.logs

## License

MIT

**Free Software, Hell Yeah!**


  
