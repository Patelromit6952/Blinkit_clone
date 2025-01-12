import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js'
import { Link,  useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
     const [data, setdata] = useState({
        email: "", 
    })
    const navigate = useNavigate()
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
    try {
        const res = await Axios({
            ...SummaryApi.forgotpassword,
            data:data
          })            
        if(res.data.error){
            toast.error(res.data.message)
        }
        if(res.data.success){
            toast.success(res.data.message)            
            navigate("/otpverification",{
                state:data
            })
            setdata({
                email : "",
            })
            
        }
    } catch (error) {
        AxiosToastError(error)
    }
}
  return (
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 text-center '>
            <p className='font-semibold '>Forgot Password</p>
            <form className='grid gap-4 mt-6' onSubmit={handleSubmit} >
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
         <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }  text-white py-3 px-2 rounded font-semibold my-3 tracking-wide`}>Send OTP</button>
             <p>
                Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
            </p>
         
         </form>
    </div>
  )
}

export default Forgotpassword