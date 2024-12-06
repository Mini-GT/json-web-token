import { Request, Response } from "express"

const notFound = (req: Request, res: Response): any => res.status(404).send('Route does not exist')

export default notFound