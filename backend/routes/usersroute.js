import { Router } from 'express';
import registerusercontroller, { forgotpasswordcontroller, logoutcontroller, loigncontroller,  refreshtoken,  resetpassword,  updateuserdetails,  uploadavtarcontroller, verifyemailcontroller, verifyforgotpasswordotp } from '../Controllers/user.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
const userrouter = Router();

userrouter.post('/register',registerusercontroller);
userrouter.post('/verify-email',verifyemailcontroller);
userrouter.post('/login',loigncontroller);
userrouter.get('/logout',auth,logoutcontroller);
userrouter.put('/upload-avatar',auth,upload.single('avatar'),uploadavtarcontroller)
userrouter.put('/update-user',auth,updateuserdetails);
userrouter.put('/forgot-password',forgotpasswordcontroller);
userrouter.put('/verify-forgotpassword-otp',verifyforgotpasswordotp);
userrouter.put('/reset-password',resetpassword);
userrouter.post('/refresh-token',refreshtoken); 
export default userrouter;