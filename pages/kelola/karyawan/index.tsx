import React, { useState } from 'react'
import { Base } from '../../../layout/base'
import { ListMenuKelolaKaryawan, TListMenu } from '../../../types/listMenu'
import { RiSettings5Line, RiHome2Line, RiSearch2Line } from "react-icons/ri";
import "@fontsource/quicksand"
import "@fontsource/poppins"
import Image from 'next/image'
import router from 'next/router';
import Logo from "../../../assets/images/logo.png";
import { TextField } from '@mui/material';
import HeaderKelola from '../../../components/kelola/Header';
import MenuKelola from '../../../components/kelola/Menu';
import LogoKelola from '../../../components/kelola/Logo';

const KelolaKaryawanPage = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const [activeMenu, setactiveMenu] = useState('')
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const searchEventHandler = (data: any) => {
    console.log(data)
  }

  const changeMenuEventHandler = (data: any) => {
    // console.log(data)
    setactiveMenu(data)
  }
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  
  return (
    <div className='kelola_karyawan w-full h-full min-h-screen' style={{backgroundColor: '#fafafb'}}>
      <div className='sidebar_kelola_karyawan bg-white fixed left-0 w-60 h-full'>
        {/* logo sidebar */}
        <LogoKelola />
        
        {/* menu sidebar */}
        <MenuKelola listMenu={ListMenuKelolaKaryawan} changeMenu={changeMenuEventHandler}/>
      </div>

      <div className="content_kelola_karyawan pl-64 pr-8">
        <Base footer="false">
          <HeaderKelola title='Kelola Karyawan' searchData={searchEventHandler}/>

          <div className='grid grid-cols-2 gap-6'>
            <div className='total_karyawan bg-red-300 p-4 rounded-lg'>
              <div>Total Karyawan</div>
              <div>100</div>
            </div>

            <div className='total_karyawan bg-red-300 p-4 rounded-lg'>
              <div>Total Karyawan</div>
              <div>100</div>
            </div>
          </div>
        </Base>
      </div>
    </div>
  )
}

export default KelolaKaryawanPage
