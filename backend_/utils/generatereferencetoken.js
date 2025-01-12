import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
 
 const generatereferencetoken = async(userid) => {
    const token  = jwt.sign(
        { id: userid },
        process.env.JWT_REFERENCE_SECRET,
        { expiresIn: '30d' }
    );
    const apdatereferencetoken = await UserModel.updateOne(
        {_id:userid},
        {refresh_token:token}
    )
    return token
 }

export default generatereferencetoken;