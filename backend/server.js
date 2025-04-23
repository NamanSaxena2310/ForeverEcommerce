import express from 'express';
import cors from 'cors';
import  'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';

//App configuration
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

//Middlewares
app.use(express.json())
app.use(cors())

//Api endpoints
app.use('/api/user', userRouter)

app.listen(port,()=>{
  console.log("App running on port " , port)
})