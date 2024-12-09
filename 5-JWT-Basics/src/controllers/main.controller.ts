import { Request, Response } from "express"
import { CustomAPIError } from "../errors/custom-error"
import jwt, { JwtPayload } from "jsonwebtoken"
import "dotenv/config"

const jwtSecretKey = process.env.JWT_SECRET

if (!jwtSecretKey) {
  throw new Error("jwtSecretKey is not defined in the environment variables");
}
// check username, password in post(login) request
// if exist create new JWT
// send back to frontend

// setup authentication so only the request with JWT can access the dashboard

const login = async(req: Request, res: Response) => {
  const {username, password} = req.body
  console.log(username, password)

  // 2 things for validation:
  // 1.mongoose validation
  // 2. Joi validation
  if(!username || !password) {
    throw new CustomAPIError('Please provide an email and password', 400)
  }

  // id is for demo, usually provided by Database
  const id = new Date().getDate()

  // its better to keep payload small, better experience for user
  const token = jwt.sign({id, username}, jwtSecretKey, {expiresIn: 10})
  
  res.status(200).json({success: true, msg: 'user created', token})
}

const dashboard = async(req: Request, res: Response) => {
  // extract token
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ msg: 'Access denied, token missing' });
  }

  // Verify token
  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      throw new CustomAPIError('Invalid Token', 403)
    }

    const { username } = user as JwtPayload;

    if(!username) {
      throw new CustomAPIError('Invalid username', 403)
    }
    
    const luckyNumber = Math.floor(Math.random()*100)

    res.status(200).json({msg: `Hello, ${username}`, secret:`Here is your authorized data, your lucky number is ${luckyNumber}`})
  });
}

export {
  login,
  dashboard
}