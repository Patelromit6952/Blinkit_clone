import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setdata] = useState({
    email: "",
    password: ""
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
            ...SummaryApi.login,
            data:data
          })            
        if(res.data.error){
            toast.error(res.data.message)
        }
        if(res.data.success){
            toast.success(res.data.message)
            localStorage.setItem('accesstoken',res.data.data.accesstoken)
            localStorage.setItem('refreshtoken',res.data.data.refreshtoken)
            setdata({
                email : "",
                password : "",
            })
            navigate("/")
        }

    } catch (error) {
        AxiosToastError(error)
    }



}
return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 text-center '>
            <p className='text-3xl font-bold'>Login to Blinkyit</p>

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
                    <label htmlFor='password'>Password :</label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-dark'>
                        <input
                            // type={showPassword ? "text" : "password"}
                            id='password'
                            className='w-full outline-none bg-blue-50'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                          
                        />
                        
                    </div>
                    <Link to={"/forgotpassword"} className='block ml-auto underline hover:text-primary-light'>Forgot Password?</Link>
                </div>

                <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Login</button>

            </form>

            <p>
                Don't have account ? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
            </p>
        </div>
    </section>
)
}

export default Login