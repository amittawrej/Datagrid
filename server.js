import express from 'express';
import connectDB from './config/database.js';
import dotenv from 'dotenv'
import familyRouter from './route/familyRoute.js'
import cors from "cors";
const app = express();
dotenv.config();

app.use(cors({
  origin:'http://localhost:5173',
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}))

app.use(express.json());
const PORT=4000;
connectDB()

app.use('/api/',familyRouter);
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

