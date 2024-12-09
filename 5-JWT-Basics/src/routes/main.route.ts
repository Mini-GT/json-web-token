import express from "express"
import { asyncWrapper } from "../middlewares/asyncWrapper"
import { login, dashboard } from "../controllers/main.controller"

const router = express.Router()

//routes
router.route("/dashboard")
.get(asyncWrapper(dashboard))

router.route("/login")
.post(asyncWrapper(login))

export default router