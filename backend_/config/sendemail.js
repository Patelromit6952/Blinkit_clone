import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

if(!process.env.EMAIL || !process.env.PASSWORD) {
    console.log("email and password not found");
    
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
});


export default transporter;