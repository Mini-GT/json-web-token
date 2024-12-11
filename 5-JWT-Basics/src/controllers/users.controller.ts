import { Request, Response } from "express"

const getUsers = async (req: Request, res: Response)=> {
  res.json({msg: "testing"})
}

const createUser = async (req: Request, res: Response) => {
  const {name} = req.params
  console.log(name)
}

export {
  getUsers,
  createUser,
}