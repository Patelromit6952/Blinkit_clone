import jwt from 'jsonwebtoken';
 const generateaccesstoken =async  (userid) => {
    const token  = jwt.sign(
        { id: userid },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '5h' }
    );
    return token
 }

export default generateaccesstoken;