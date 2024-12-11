import express from "express"
import { asyncWrapper } from "../middlewares/asyncWrapper"
import { login, dashboard } from "../controllers/main.controller"
import { authentication } from "../middlewares/auth.middleware"

const router = express.Router()

//routes
router.route("/dashboard")
.get(authentication, asyncWrapper(dashboard))

router.route("/login")
.post(asyncWrapper(login))

export default router