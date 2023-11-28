import React from 'react'
import './Navbar.css'
import logo from '../../Images/logo.png'
import { IoMdRefreshCircle } from "react-icons/io";



const Navbar = () => {
  return (
    <div className='Navbar'>

        <div className='Site-Name'>
            <span><img src={logo} alt="" className='Site-logo' /></span>
            <span>Weather 99</span>
        </div>

        <div className='Refresh' onClick={()=>{window.location.reload()}}>
        <span><IoMdRefreshCircle className='Refresh-logo'/></span>
            <span>Refresh</span>
        </div>

        
    </div>
  )
}

export default Navbar