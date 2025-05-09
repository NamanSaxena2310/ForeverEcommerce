import express from 'express';
import cors from 'cors';
import  'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';

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
app.use('/api/product', productRouter)
app.use('/api/cart',cartRouter)

app.listen(port,()=>{
  console.log("App running on port " , port)
})