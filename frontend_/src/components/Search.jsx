import React, { useEffect, useState } from 'react'
import {IoSearch} from "react-icons/io5"
import { TypeAnimation } from 'react-type-animation'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Usemobile from '../hooks/Usemobile'

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [issearchpage,setissearchpage] = useState(false)
    const [ismobile] = Usemobile()
    useEffect(()=>{
        const issearch = location.pathname === "/search";
        setissearchpage(issearch);
    },[location])
    
    const redirecttosearchpage = () => {
        navigate("/search")
    }

  return (
    <div className='w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border p-1 overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-light '>
        <div>
            {
                (ismobile && issearchpage) ?(
                    <Link to={"/"} className='flex justify-center items-center h-full p-1.5 m-1 text-neutral-600 group-focus-within:text-primary-dark bg-white rounded-full shadow-md'>
                    <FaArrowLeft size={20}/>
                    </Link>
                ):(
                    <button className='flex justify-center items-center h-full p-3 text-neutral-600 group-focus-within:text-primary-dark'>
                    <IoSearch size={22}/>
                    </button>
                )
            }
           
        </div>
        <div className='w-full'>
            {
                !issearchpage ? (
                    <div onClick={redirecttosearchpage} className='w-full h-full'>
                    <TypeAnimation
                    sequence={[
                            'Search "milk"',
                             1000,
                             'Search "bread"',
                             1000,
                             'Search "sugar"',
                             1000,
                             'Search "panner"',
                             1000,
                             'Search "chocolate"',
                             1000,
                             'Search "curd"',
                             1000,
                             'Search "rice"',
                             1000,
                             'Search "egg"',
                             1000,
                             'Search "chips"',
                             1000,
                             'Search "drinks"',
                             1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        />
                </div>
                ):(
                    <div className='w-full h-full'>
                        <input type="text"
                        placeholder='Search for atta dal and more' 
                        autoFocus
                        className='w-full h-full outline-none  bg-slate-50'/>
                    </div>
                )
            }
        </div>
       
    </div>
  )
}

export default Search