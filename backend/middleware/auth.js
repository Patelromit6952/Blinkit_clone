import  jwt from 'jsonwebtoken';
const auth = async (req,res,next) =>{
    try {
        const token = req.cookies.accesstoken || req?.header?.authorization?.split(" ")[1];
        if(!token)
        {
            return res.status(400).json({
                message:"provide token"
            })
        }
        const decode = await jwt.verify(token,process.env.JWT_ACCESS_SECRET);
        if(!decode){
            return res.status(401).json({
                message:"unauthorized access",
                error:true,
                success:false
            })
        }
        
        req.userid = decode.id
        next();
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}
export default auth