import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import Footer from './components/Footer'
import toast,{Toaster} from 'react-hot-toast'
import fetchuserdetails from './utils/Fetchuserdetails'

function App() {
  const fetchuser = async () =>{
    const userdata = await fetchuserdetails()
    console.log("userdata: " ,userdata);
    
  }
  useEffect(()=>{
   fetchuser()
  },[])
  return (
    <>
    <Header/>
    <main className='min-h-[78vh]'>
      <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
    </>
  )
}
export default App