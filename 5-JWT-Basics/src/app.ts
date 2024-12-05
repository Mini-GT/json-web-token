import express from "express"

const app = express()

const PORT = 5001

app.get('/', (req, res) => {

})

console.log('stss')

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}...`)
})