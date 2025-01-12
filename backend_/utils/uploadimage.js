import {v2 as cloudinary} from 'cloudinary';
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
const uploadimagecloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await Image.arrayBuffer());
    const uploadimage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder:"blinkit"},(error,uploadresult)=>{
            return resolve(uploadresult)
        }).end(buffer)
    })
    return uploadimage
}

export default uploadimagecloudinary;