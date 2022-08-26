// movies GET
import express from 'express';
import { auth } from '../middleware/auth.js';
import { getAllMovies, getMovieById, deleteMovieById, createMovies, updateMovieById } from './helperfunc.js';


const router = express.Router()


router.get('/', async (req,res) => {
    // if filter is number -> convert query to number
    // if(req.query.rating){
    //   req.query.rating = +req.query.rating;
    // }
    // find returns Cursor -> Pagination
    // to convert cursor to array use  ->  "toArray()"
  const movies = await getAllMovies(req)  
   res.send(movies)
  })
  
  router.get('/:id', async (req,res) => {
      const { id } = req.params
      console.log(req.params)
      // const movie = movies.find((mv) => mv.id === id)
      const movie = await getMovieById(id)
      movie ? res.send(movie) : res.send({msg:"Movie Not Found"})
  })
  
  
  // Delete movie by Id
  router.delete('/:id',auth, async (req,res) => {
    const { id } = req.params
    // console.log(req.params)
    const result = await deleteMovieById(id)
    result.deletedCount > 0 ?  res.send({msg:"Movie Deleted successfully"})
    : res.send({msg:"Movie Not Found"})
  })
  

  // middleware - express.json() --> converts body to json
  
  // CREATE / POST MOVIES
  router.post('/',auth, async (req,res) => {
    const data = req.body
    const movies = await createMovies(data)
    res.send(movies)
  })
  
  
  // update
  
  router.put('/:id',auth, async (req,res) => {
    const { id } = req.params;
    const data = req.body;
    // db.movies.updateOne({id:id}, {$set:data})
    const movies = await updateMovieById(id, data);
    res.send(movies)
  })

//   api methods export
  export const moviesRouter = router




