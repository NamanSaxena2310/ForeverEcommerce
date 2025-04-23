import express from 'express';
import cors from 'cors';
import  'dotenv/config';

//App configuration
const app = express()
const port = process.env.PORT || 5000

//Middlewares
app.use(express.json())
app.use(cors())

//Api endpoints

app.get('/', (req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
  console.log("App running on port " , port)
})