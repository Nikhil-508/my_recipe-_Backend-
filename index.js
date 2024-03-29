const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require ('dotenv').config()
const userRouter = require('./Routes/auth')
const cookieParser = require('cookie-parser')
const recipeRouter = require('./Routes/reciper')
const app = express()


//>>>>>>>>>>> Setting up the CORS  <<<<<<<<<<<<<<<

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET","POST","DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json()) 
app.use('/auth',userRouter)
app.use("/recipe",recipeRouter)

const port =  process.env.PORT || 5000


//>>>>>>>>>>> Setting up the Server <<<<<<<<<<<<<<<

app.listen(port,()=>{
    console.log( `Server is running on http://localhost:${port}`)
})


//>>>>>>>>>>> MongoDB Connection <<<<<<<<<<<<<<<

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});