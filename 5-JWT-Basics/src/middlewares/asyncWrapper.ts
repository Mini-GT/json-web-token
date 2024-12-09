import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void | Promise<any>;

export const asyncWrapper = (fn: AsyncHandler): RequestHandler  => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  };
}