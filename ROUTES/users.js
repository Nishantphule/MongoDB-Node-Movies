import express from 'express';
import { createUser,getUserByName } from './helperfunc.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const router = express.Router()

async function generateHashedPassword(password){
  const NoOfRounds = 10
  const salt = await bcrypt.genSalt(NoOfRounds)
  const hashedPassword = await bcrypt.hash(password,salt)
  return hashedPassword;
}


  // CREATE / POST USERS
  router.post('/signup', async (req,res) => {
    const { username , password, email } = req.body
    const userFromDB = await getUserByName(username)

    if(userFromDB){
      const storedPassword = userFromDB.password;
      const isPasswordMatch = await bcrypt.compare(password , storedPassword)
      if(isPasswordMatch){
        res.status(400).send({"message":"User Already Exists"})
      }
      else{
        res.status(400).send({"message":"Username Not Available"})
      }
    }
    else if(password.length<8){
      res.status(400).send({"message":"Password must be atleast 8 characters"})
    }
    else{
    const hashedPassword =  await generateHashedPassword(password)
    const users = await createUser({username:username , password:hashedPassword, email:email})
    res.send({"message":"Successful Signup",users:users}) 
    }
  })  

  
// login
router.post('/login', async (req,res) => {
  const { username , password } = req.body

  const userFromDB = await getUserByName(username) 

  if(!userFromDB){
    res.status(400).send({"message":"Invalid Credentials"})
  }
  else {
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password , storedPassword)
    if(isPasswordMatch){
      const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY)
      res.header({"x-auth-token":token})
      res.send({"message":"Successful Login", token:token})
    }
    else
    {
      res.send({"message":"Invalid Credentials"})
    } 
  }
})


//   api methods export
  export const usersRouter = router




