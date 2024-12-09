import express from "express"
import { asyncWrapper } from "../middlewares/asyncWrapper"
import { createUser, getUsers } from "../controllers/users.controller"

const router = express.Router()

//routes
router.route("/")
.get(asyncWrapper(getUsers))
.post(asyncWrapper(createUser))

export default router
