import React, { useEffect, useState,useRef } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Otpverification = () => {
    const [data, setdata] = useState(["","","","","",""])
    const validValue = data.every(el => el)
    const location = useLocation()
    const navigate = useNavigate()
    const inputref = useRef([])
    useEffect (()=>{
      if(!location?.state?.email){
        navigate("/forgotpassword")
      }
    },[])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const res = await Axios({
                ...SummaryApi.verifyotp,
                data:{
                  otp:data.join(""),
                  email:location?.state?.email
                }
              })            
            if(res.data.error){
                toast.error(res.data.message)
            }
            if(res.data.success){
                toast.success(res.data.message)
                setdata(["","","","","",""])
                navigate("/resetpassword",{
                  state:{
                    data:res.data,
                    email:location?.state?.email
                  }
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }
}
  return (
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 text-center '>
            <p className='font-semibold '>Enter OTP</p>
            <form className='grid gap-4 mt-6' onSubmit={handleSubmit} >
        <div className='grid gap-2 text-left'>
                    <label htmlFor='otp'>Enter Your OTP :</label>
                    <div className='flex items-center gap-2  justify-between mt-3'>
                      {
                        data.map((element,index) => {
                          return(
                            <input
                            key={"otp"+index}
                                type='text'
                                maxLength={1}
                                ref={(ref)=>{
                                  inputref.current[index] = ref
                                   return ref
                                }}
                                value={data[index]}
                                onChange={(e)=>{
                                  const value = e.target.value
                                  const newdata = [...data]
                                  newdata[index]=value
                                  setdata(newdata)
                                  if(value && index<5){
                                    inputref.current[index+1].focus()
                                  }
                                }}
                                id='otp'
                                className='bg-blue-50 p-2 border rounded w-full  max-w-16 outline-none text-center focus:border-primary-dark'
                            />
                          )
                        })
                      }
                    </div>
         </div>
         <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }  text-white py-3 px-2 rounded font-semibold my-3 tracking-wide`}>Verify OTP</button>         
         </form>
    </div>
  )
}

export default Otpverification