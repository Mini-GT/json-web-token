import express from "express"
import "dotenv/config"
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware"
import notFound from "./middlewares/notFound.middleware"

const app = express()

const port = process.env.PORT

// middleware
app.use(express.static('./public'))
app.use(express.json())

app.use(errorHandlerMiddleware)
app.use(notFound)

app.listen(port, () => {
    console.log(`Running on Port ${port}...`)
})