import { userdetails } from "../../../backend_/Controllers/user";

export const baseurl = "http://localhost:3000" ;
const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login:{
        url:'/api/user/login',
        method:'post'
    },
    forgotpassword:{
        url:'/api/user/forgot-password',
        method:"put"
    },
    verifyotp:{
        url:"/api/user/verify-forgotpassword-otp",
        method:"put"
    },
    resetpassword:{
        url:"/api/user/reset-password",
        method:"put"
    },
    refreshtoken:{
        url:"api/user/refresh-token",
        method:"post"
    },
    userdetails:{
        url:"api/user/userdetails",
        method:"get"
    }
}

export default SummaryApi