// const express = require('express')  //importing express
import express, { request } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
import { moviesRouter } from "./ROUTES/movies.js"
import cors from 'cors'
import bcrypt from 'bcrypt'
import { usersRouter } from './ROUTES/users.js';

dotenv.config();

const app = express()

// const PORT = 4000;

const PORT = process.env.PORT; // for heroku 

 app.use(cors());  // to give permission to react app -> in netlify to fetch db

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

// to get the methods for movies api
app.use('/movies', moviesRouter)


// mobiles

app.get('/mobiles', async (req,res) => {
  const mobiles = await client
  .db("Nishant")
  .collection("mobiles")
  .find(req.query) // req.query to apply filter from url -> e.g.->  ?language=english
      // find returns Cursor -> Pagination
    // to convert cursor to array use  ->  "toArray()"
  .toArray();
   res.send(mobiles)
  })

app.post('/mobiles', async (req,res) => {
    const data = req.body
    const mobiles = await client.db("Nishant").collection("mobiles").insertMany(data);
    res.status(201).send(mobiles)
  })  

app.listen(PORT, () => console.log(`App started in ${PORT}`));


// hashing using bcrypt

// async function generateHashedPassword(password){

//   const NoOfRounds = 10
//   const salt = await bcrypt.genSalt(NoOfRounds)
//   const hashedPassword = await bcrypt.hash(password,salt)
//   console.log(salt,hashedPassword)
// }
// generateHashedPassword("password@123")