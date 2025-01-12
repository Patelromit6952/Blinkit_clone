import { useEffect, useState } from "react"

const Usemobile = (breakpoint = 768) => {
    const [ismobile,setismobile] = useState(window.innerWidth < breakpoint);
    const handleresize = () => {
        const check = window.innerWidth < breakpoint ;
        setismobile(check)
    }
    useEffect(()=>{
        handleresize();
        window.addEventListener('resize',handleresize);
        return () => {
            window.removeEventListener('resize',handleresize)
        }
    },[])
    return [ismobile]
}
export default Usemobile;