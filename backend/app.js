import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"


dotenv.config()

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req,res)=>{   
    res.send("Server is running:")
}) 

import uploadRoutes from "./routes/upload.route.js"
import authRoutes from "./routes/auth.route.js"

app.use("/api/v1", uploadRoutes)
app.use("/api/v1/auth", authRoutes)

export {app}

