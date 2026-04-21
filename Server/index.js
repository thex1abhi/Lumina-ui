import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./configs/conectDB.js"
dotenv.config()

const app = express()

const PORT = process.env.PORT 
app.get("/", (req, res) => {
    res.json("Hello from server ")
})
 
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`) 
    connectDB()
}) 