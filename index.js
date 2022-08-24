// const express = require('express')  //importing express
import express, { request } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
import { moviesRouter } from "./ROUTES/movies.js"
import cors from 'cors'

dotenv.config();

const app = express()

// const PORT = 4000;

const PORT = process.env.PORT; // for heroku 

app.use(cors())  // to give permission to react app

  // add middleware globally
  // app.use -> Intercepts -> applies express.json() (Inbuilt middle ware)
  app.use(express.json());


  // mongoDB compass connection
// const MONGO_URL = "mongodb://localhost:27017"

// mongoDB atlas connection
const MONGO_URL = process.env.MONGO_URL;


async function createConnection(){
  const client = new MongoClient(MONGO_URL)
 await client.connect()
 console.log("Mongo is Connected✔")
 return client;
}
export const client = await createConnection();


// using express to send data from mongo to api server
app.get('/', function (req, res) {
  res.send('Welcome to our App 🥂🥂')
})


app.use('/movies', moviesRouter)

app.listen(PORT, () => console.log(`App started in ${PORT}`));