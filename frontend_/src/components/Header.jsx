import React from 'react'
import logo from "../assets/logo.png"
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {FaRegCircleUser} from 'react-icons/fa6';
import Usemobile from '../hooks/Usemobile'
import {BsCart4} from 'react-icons/bs'
import { useSelector } from 'react-redux';

export const Header = () => {
    const [ismobile] = Usemobile()
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector((state)=> state?.user)
    console.log(user);
    
    const issearchpage = location.pathname === "/search";

    const redirecttologinpage = () => {
        navigate("/login")
    }

  return (
    <>
    <header className='h-24 lg:h-20 lg:shadow-md sticky bg-white top-0 flex  flex-col justify-center gap-1'>
        {
            !(issearchpage && ismobile) && (
                <div className='container mx-auto flex items-center  px-3 justify-between'>
                    {/* logo section */}
                    <div className='h-full'>
                        <Link to={"/"} className='h-full flex justify-center  items-center'>
                            <img src={logo} alt="logo" width={120} height={70} className='hidden lg:block' />
                            <img src={logo} alt="logo" width={120} height={70} className='lg:hidden' />
                        </Link>
                    </div>
                    {/* search section */}
                    <div className='hidden lg:block'>
                        <Search/>
                    </div>
                    {/* login and my cart section */}
                    <div>
                        {/* user icon show only in mobile */}
                        <div>
                            <button className='text-neutral-600 lg:hidden'>
                                <FaRegCircleUser size={26}/>
                            </button>
                        </div>
                        {/* for desktop */}
                    <div className='hidden lg:flex items-center gap-2'>
                       <button onClick={redirecttologinpage} className='text-lg px-5'>Login</button>
                            <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 mx-1 rounded text-white'>
                                {/* add to cart icon */}
                                <div className='animate-bounce'>
                                    <BsCart4 size={26}/>
                                </div>
                                <div className='font-semibold'>
                                    {/* number of items */}
                                 <p>My Cart</p>
                                </div>
                            </button>
                    </div>
                    </div>
                </div>
            )
        }

        <div className='container mx-auto px-2 lg:hidden'>
            <Search/>
        </div>
    </header>
    </>
  )
}
