// movies GET
import express from 'express';
import { client } from '../index.js';
const router = express.Router()

router.get('/', async (req,res) => {

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
  
  router.get('/:id', async (req,res) => {
  
      const { id } = req.params
      console.log(req.params)
  
      // db.movies.findOne({id: "102"})
  
      // const movie = movies.find((mv) => mv.id === id)
  
      const movie = await client.db("Nishant").collection("movies").findOne({id:id})
  
      movie ? res.send(movie) : res.send({msg:"Movie Not Found"})
  
  })
  
  
  // Delete movie by Id
  router.delete('/:id', async (req,res) => {
  
    const { id } = req.params
    console.log(req.params)
  
    // db.movies.DeleteOne({id: "102"})
  
    const result = await client.db("Nishant").collection("movies").deleteOne({id:id})
  
    result.deletedCount > 0 ?  res.send({msg:"Movie Deleted successfully"})
    : res.send({msg:"Movie Not Found"})
  
  })
  
  
  // middleware - express.json() --> converts body to json
  // CREATE / POST MOVIES
  router.post('/', async (req,res) => {
    const data = req.body
  
    // db.movies.insertMany
  
    const movies = await client.db("Nishant").collection("movies").insertMany(data)
  
    res.send(movies)
  })
  
  
  // update
  
  router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const data = req.body;
    // db.movies.updateOne({id:id}, {$set:data})
    const movies = await client.db("Nishant").collection("movies").updateOne({id:id}, {$set:data});
  
    res.send(movies)
  })

  export const moviesRouter = router