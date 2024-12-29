import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectdb from './config/connectDB.js';
import userrouter from './routes/usersroute.js';

const app = express();
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet());

const port = process.env.PORT || 8000;

app.get("/",(req,res)=>{
    res.json({
        message:"Server is running" + port
    })
})

app.use('/api/user',userrouter);

connectdb().then(()=>{
    app.listen(port,()=>{
        console.log("server is running ", port);
    })
})
