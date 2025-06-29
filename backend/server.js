import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"

dotenv.config()
const PORT = process.env.PORT || 5000

connectDB()
.then(() => {
    app.listen(PORT,()=>
        console.log(`Server running at port ${PORT}`));
})
.catch((err) => {
    console.log("Error connecting to DB", err);
    
})