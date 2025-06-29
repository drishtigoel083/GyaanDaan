import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req,res)=>{
    res.send("Server is running:"+ process.env.NODE_ENV)
}) 

import uploadRoutes from "./routes/upload.route.js"

app.use("/api/v1", uploadRoutes)

export {app}

