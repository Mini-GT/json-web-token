import { CustomError } from "../../types/customError.types"
import { CustomAPIError } from "../errors/custom-error"
import { Request, Response, NextFunction} from "express"

const errorHandlerMiddleware = (error: CustomError, req: Request, res: Response, next: NextFunction): any  => {
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ msg: error.message })
  }
  return res.status(500).send('Something went wrong try again later')
}

export default errorHandlerMiddleware;
