// movies GET
import express from 'express';
import { createUser,getAllUsers } from './helperfunc.js';
import bcrypt from 'bcrypt'

const router = express.Router()

async function generateHashedPassword(password){
  const NoOfRounds = 10
  const salt = await bcrypt.genSalt(NoOfRounds)
  const hashedPassword = await bcrypt.hash(password,salt)
  return hashedPassword;
}

  // CREATE / POST USERS
  router.post('/signup', async (req,res) => {
    const { username , password } = req.body
    
    // router.get('/signup', async (req,res) => {
    //   const users = await getAllUsers(req)
    //   users.
    // })

    const hashedPassword =  await generateHashedPassword(password)
    const users = await createUser({username:username , password:hashedPassword})
    res.send(users)
  })

//   api methods export
  export const usersRouter = router




