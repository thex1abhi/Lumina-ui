import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./configs/conectDB.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import cors from "cors"
dotenv.config()

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
       credentials:true
}
))
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => {
    res.json("Hello from server ")
})

app.use("/api/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
    connectDB()
}) 