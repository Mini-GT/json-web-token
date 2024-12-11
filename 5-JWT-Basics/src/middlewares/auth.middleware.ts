import { Request, Response, NextFunction } from "express"
import { CustomAPIError } from "../errors/custom-error"
import jwt, { JwtPayload } from "jsonwebtoken"
import "dotenv/config"

const jwtSecretKey = process.env.JWT_SECRET
if (!jwtSecretKey) {
  throw new Error("jwtSecretKey is not defined in the environment variables");
}

// Define a custom type for the Request with user property
interface AuthenticatedRequest extends Request {
  user?: { id: string; username: string };
}

const authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Extract token
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      throw new CustomAPIError('Access denied, token missing', 401)
    }

    // Verify token
    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
        console.log(err)
        throw new CustomAPIError('Not authorized to access this route', 403)
      }

      const { id, username } = user as JwtPayload;

      if(!username || !id) {
        throw new CustomAPIError('Invalid User', 403)
      }
      req.user = { id, username };
    });
    next()
  } catch (error) {
    next(error)
  }
}

export {
  authentication
}