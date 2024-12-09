import express from "express"
import "dotenv/config"
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware"
import notFound from "./middlewares/notFound.middleware"
import userRouter from "./routes/login.route"
import mainRouter from "./routes/main.route"
import { connectDB } from "../db/connect"

const app = express()

const port = process.env.PORT

// middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1', mainRouter)

app.use(errorHandlerMiddleware)
app.use(notFound)

app.listen(port, () => {
  // connectDB()
  console.log(`Running on Port ${port}...`)
})