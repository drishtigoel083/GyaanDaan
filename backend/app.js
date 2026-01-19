import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"


dotenv.config()

const app = express()

const allowedOrigins = [
  process.env.FRONTEND_URL_DEV,
  process.env.FRONTEND_URL_PROD
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'), false);

  },
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

