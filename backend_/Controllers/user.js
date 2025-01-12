
import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'
import transporter from '../config/sendemail.js'
// import sendemail from "../config/sendemail.js";
import verificationemailtemplate from "../utils/verifyemailtemplate.js";
import  dotenv  from "dotenv";
dotenv.config();
import generatereferencetoken from "../utils/generatereferencetoken.js";
import generateaccesstoken from "../utils/generateaccesstoken.js";
import upload from "../middleware/multer.js";
import uploadimagecloudinary from "../utils/uploadimage.js";
import generateotp from "../utils/generateotp.js";
import forgotpasswordtemplate from "../utils/forgotpasswordtemplate.js";

export async function registerusercontroller(req,res){
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"Please Fill All The Required Fields ",
                error:true,
                success:false
            })
        }
        const user = await UserModel.findOne({email})
        if(user){
            return res.json({
                message:"Already register Email",
                error:true,
                success:false
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password,salt);
        const payload = {
            name,
            email,
            password:hashpassword
        }
        const newuser = new UserModel(payload);
        const save = await newuser.save();
        const verifyemailurl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;
        const verificationemail = await sendemail({
            sendto:email,
            subject:"verify email from blinkyit",
            html:verificationemailtemplate({
                name,
                url:verifyemailurl
            })
        })

        return res.json({
            message:"User register successfully",
            error:false,
            success:true,
            data:save
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}
export async function verifyemailcontroller(req,res) {
    try {
        const code = req.body;
        const user = await UserModel.findOne({_id:code});
        if(!user){
            return rs.status(400),json({
                message:"invalid code",
                error:true,
                success:false
            }) 
        }
        const updateuser = await UserModel.updateOne({_id:code},{verify_email:true});
        return res.json({
            message:"verification done",
           success:true,
            error:false
        })

    } catch (error) {
      return   res.status(500).json({
                 message:error.message || error,
                 error:true,
                 success:false
            })
    }
}
export async function loigncontroller(req,res){
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"all fields are required",
                error:true,
                success:false
            })
        }
        const user  = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
               message:"user not register",
               error:true,
               success:false 
            })
        }
        if(user.status !== "Active"){
            return res.status(400).json({
                message:"contact to the admin",
                error:true,
                success:false
            })
        }
        const checkpassword = await bcryptjs.compare(password,user.password);
        if(!checkpassword){
            return res.status(400).json({
                message:"Invalid Password",
                error:true,
                success:false
            })
        }

        const accesstoken = await generateaccesstoken(user._id);
        const refreshtoken = await generatereferencetoken(user._id);

        const updateuser = await UserModel.findByIdAndUpdate(user._id,{
            last_login_date:new Date()
        })
        const cookieoption = {
            httponly:true,
            secure:true,
            samesite:"none"
        }
        res.cookie('accesstoken',accesstoken,cookieoption);
        res.cookie('refreshtoken',refreshtoken,cookieoption);
        res.status(200).json({
            message:"login successfully",
            error:false,
            success:true,
            data:{
                accesstoken,
                refreshtoken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}
export async function logoutcontroller (req,res){
    try {
        const userid = req.userid;
        const cookieoption = {
            httponly:true,
            secure:true,
            samesite:"none"
        }
        res.clearCookie("accesstoken",cookieoption)
        res.clearCookie("referencetoken",cookieoption)
        
        const removerefreshtoken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token:""
        })
        return res.json({
            message:"logout successfully..",
            error:false,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}
export async function uploadavtarcontroller(req,res)  {
    try {
        const userid = req.userid;
        const image =req.file;
        const upload = await uploadimagecloudinary(image);
        const user = await UserModel.findByIdAndUpdate(userid,{
            avatar:upload.url
        })
        return res.json({
            message:"profile uploaded ",
            data:user.avatar
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}
export async function updateuserdetails(req,res){
    const userid = req.userid;
    const {name,email,mobile,password} = req.body;
    let hashpassword="";
    if(password){
        const salt = await bcryptjs.genSalt(10);
        hashpassword = await bcryptjs.hash(password,salt);
    }
    const updateuser = await UserModel.findByIdAndUpdate(userid,{
        ...(name && {name:name}),
        ...(email && {email:email}),
        ...(mobile && {mobile:mobile}),
        ...(password && {password:hashpassword})
    })
    return res.json({
        message:"user updated successfully",
        error:false,
        success:true,
        data:updateuser
    })
}
export async function forgotpasswordcontroller(req,res) {
    try {
        const {email}  = req.body;
        const user = await UserModel.findOne({email});
        
        if(!user){
            return res.status(400).json({
                message:"Email not available",
                error:true,
                success:false
            })
        }

        const otp = generateotp();
        const expiretime = new Date() + 60*60*1000;

        const update = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry:new Date(expiretime).toISOString()
        })
        const emailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Forgot Password from Blinkyit',
            html: forgotpasswordtemplate({ name: user.name, otp }),
          };
          await transporter.sendMail(emailOptions);

        return res.json({
            message:"forogt otp sent on your email",
            error:false,
            success:true
        })

    } catch (error) {
       return res.json({
       message:error.message || error,
       error:true,
       success:false,
       })
    }
}
export async function verifyforgotpasswordotp(req,res){
    try {
        const {email,otp} = req.body;
        if(!email || !otp){
            return res.json({
                message:"provide required feilds",
                error:true,
                success:false
            })
        }
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Email not available",
                error:true,
                success:false
            })
        }
        const currenttime = new Date().toISOString();
        if(user.forgot_password_expiry < currenttime){
            return res.status(400).json({
                message:"otp is expire",
                error:true,
                success:false
            })
        }
        if(otp !== user.forgot_password_otp){
            return res.json({
                message:"invalid otp",
                error:true,
                success:false
            })
        }
        const updateuser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp:"",
            forgot_password_expiry:""
        })
        return res.json({
            message:"verify otp successfully",
            error:false,
            success:true
        })

    } catch (error) {
        return res.json({
        message:error.message || error,
        error:true,
        success:false,
        })
    }
}
export async function resetpassword(req,res) {
    try {
       const {email,newpassword,confirmpassword} = req.body;
       if(!email || !newpassword || !confirmpassword){
            return res.json({
                message:"all fields are required!",
                error:true,
                success:false
            })
       }
       
       const user = await UserModel.findOne({email});
       if(!user){
           return res.status(400).json({
               message:"Email not available",
               error:true,
               success:false
           })
       }

       if(newpassword !== confirmpassword){
        return res.status(400 ).json({
            message:"confirm password doesn't match new password",
            error:true,
            success:false
        })
       } 
       const salt = await bcryptjs.genSalt(10);
       const hashpassword = await bcryptjs.hash(newpassword,salt);
       const update = await UserModel.findOneAndUpdate(user._id,{
            password:hashpassword
       })

       return res.status(200 ).json({
       message:"password updated successfully",
       error:false,
       success:true
       })

    } catch (error) {
        return res.json({
        message:error.message || error,
        error:true,
        success:false,
        })
    }
}
export async function refreshtoken(req,res) {
    try {
        const refreshtoken = req.cookies.refreshtoken || req?.header?.authorization?.split(" ")[1];
        
        if(!refreshtoken){
            return res.status(401).json({
            message:"invalid token",
            error:true,
            success:false
            })
        }

        const verifytoken = await jwt.verify(refreshtoken,process.env.JWT_REFERENCE_SECRET);
        if(!verifytoken){
            return res.status(401).json({
            message:"token is expire",
            error:true,
            success:false
            })
        }
        const userid = verifytoken?._id;
        const newaccesstoken = await generateaccesstoken(userid);
        const cookieoption = {
            httponly:true,
            secure:true,
            samesite:"none"
        }
        res.cookie("accesstoken",newaccesstoken,cookieoption)
        return res.status(200).json({
            message:"new access token generated",
            error:false,
            success:true
        })
    } catch (error) {
        return res.json({
        message:error.message || error,
        error:true,
        success:false,
        })
    }
}
export async function userdetails(req,res) {
    try {
        const userid = req.userid
        console.log(userid);
        
        const user = await UserModel.findById(userid).select('-password -refresh_token')

        return res.json({
            message:"user details",
            data:user,
            error:false,
            success:true
        })
    } catch (error) {
        return res.json({
        message:error.message || error,
        error:true,
        success:false,
        })
    }
}
export default registerusercontroller;