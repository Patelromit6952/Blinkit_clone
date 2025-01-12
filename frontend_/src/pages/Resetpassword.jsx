import React, { useEffect, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Resetpassword = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [data, setdata] = useState({
    email: "",
    newpassword: "",   
    confirmpassword: ""
})
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
useEffect(()=>{
  if(!(location?.state?.data?.success)){
    navigate("/")
  }
  if(location?.state?.email){
    setdata((preve)=>{
      return{
        ...preve,
        email:location?.state?.email
      }
    })
  }
},[])

const handleChange = (e) => {
    const { name, value } = e.target

    setdata((preve) => {
        return {
            ...preve,
            [name]: value
        }
    })
}

const validValue = Object.values(data).every(el => el)

const handleSubmit = async(e)=>{
    e.preventDefault()
    
    if(data.newpassword !== data.confirmpassword){
      toast.error(            
        "new password and confirm password must be same"
      )          
        return
    }

    try {
        const res = await Axios({
            ...SummaryApi.resetpassword,
            data:data
          })            
        if(res.data.error){
            toast.error(res.data.message)
        }

        if(res.data.success){
            toast.success(res.data.message)
            navigate("/login")
            setdata({
                email : "",
                newpassword : "",
                confirmpassword : ""
            })
        }

    } catch (error) {
        AxiosToastError(error)
    }
}
  return (
    <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 text-center'>
                <p className='text-2xl font-bold'>Reset Password</p>

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    {/* emali  */}
                    <div className='grid gap-1 text-left'>
                        <label htmlFor='email'>Email :</label>
                        <input
                            type='email'
                            id='email'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-dark'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    {/* password  */}
                    <div className='grid gap-1 text-left'>
                        <label htmlFor='newpassword'>New Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-dark'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='newpassword'
                                className='w-full outline-none bg-blue-50'
                                name='newpassword'
                                value={data.newpassword}
                                onChange={handleChange}
                                placeholder='Enter your new  password'
                              
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {/* confirmPassword  */}
                    <div className='grid gap-1 text-left'> 
                        <label htmlFor='confirmpassword'>Confirm Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-dark'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmpassword'
                                className='w-full outline-none bg-blue-50'
                                name='confirmpassword'
                                value={data.confirmpassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />
                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Reset Password</button>
                </form>
            </div>
        </section>
  )
}
export default Resetpassword