// const express = require('express')  //importing express
import express, { request } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();


const app = express()

const PORT = 4000;

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
const client = await createConnection();


// using express to send data from mongo to api server
app.get('/', function (req, res) {
  res.send('Welcome to our App 🥂🥂')
})


// movies GET
app.get('/movies', async (req,res) => {

  // if filter is number -> convert query to number
  // if(req.query.rating){
  //   req.query.rating = +req.query.rating;
  // }
  // db.movies.find({})

  // find returns Cursor -> Pagination
  // to convert cursor to array use  ->  "toArray()"
const movies = await client
 .db("Nishant")
 .collection("movies")
 .find(req.query)  // req.query to apply filter from url -> e.g.->  ?language=english
 .toArray()  

 res.send(movies)
})


app.get('/movies/:id', async (req,res) => {

    const { id } = req.params
    console.log(req.params)

    // db.movies.findOne({id: "102"})

    // const movie = movies.find((mv) => mv.id === id)

    const movie = await client.db("Nishant").collection("movies").findOne({id:id})

    movie ? res.send(movie) : res.send({msg:"Movie Not Found"})

})


// Delete movie by Id
app.delete('/movies/:id', async (req,res) => {

  const { id } = req.params
  console.log(req.params)

  // db.movies.DeleteOne({id: "102"})

  const result = await client.db("Nishant").collection("movies").deleteOne({id:id})

  result.deletedCount > 0 ?  res.send({msg:"Movie Deleted successfully"})
  : res.send({msg:"Movie Not Found"})

})


// middleware - express.json() --> converts body to json
// CREATE / POST MOVIES
app.post('/movies', async (req,res) => {
  const data = req.body

  // db.movies.insertMany

  const movies = await client.db("Nishant").collection("movies").insertMany(data)

  res.send(movies)
})

app.listen(PORT, () => console.log(`App started in ${PORT}`));


// update

// app.put('/movies', async (req,res) => {
//   const data = req.body

//   // db.movies.insertMany

//   const movies = await client.db("Nishant").collection("movies").insertMany(data)

//   res.send(movies)
// })

// app.listen(PORT, () => console.log(`App started in ${PORT}`));