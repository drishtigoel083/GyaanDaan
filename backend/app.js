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
import noteRoutes from "./routes/note.route.js"

app.use("/api/v1", uploadRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/notes", noteRoutes)

export {app}

