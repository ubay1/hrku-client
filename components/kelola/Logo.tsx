import router from 'next/router'
import React from 'react'
import Image from 'next/image'
import Logo from "../../assets/images/logo2.png";

const LogoKelola = () => {
  return (
    <div className='flex justify-center mt-4 mb-10'>
      <div 
        className='text-white h-14 w-14 flex justify-center items-center cursor-pointer font-semibold'
        onClick={()=>{
          router.push('/')
        }}
      >
        <Image src={Logo} width="100" height="100" className="pointer-events-none"/>
      </div>
    </div>
  )
}

export default LogoKelola
