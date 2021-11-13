import React, { useState } from 'react'
import { RiParentLine, RiSettings5Line, RiLogoutBoxRLine } from 'react-icons/ri'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { TListMenu } from '../../types/listMenu'
import Image from 'next/image'
import router from 'next/router';
import Logo from "../../assets/images/logo2.png";

interface IMenuKelola {
  listMenu: any,
  changeMenu: any
}

const MenuKelola = (props: IMenuKelola) => {
  console.log('render child menu')
  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const [activeMenu, setactiveMenu] = useState('kelola_karyawan')
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  
  return (
    <div className='flex flex-col justify-between h-full'>
      
      <div>
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

        <div className='flex justify-center items-center flex-col px-3'>
          {
            props.listMenu.map((item: TListMenu, index: number) => {
              return(
                <div 
                  key={`key list-menu-karyawan - ${index}`}
                  className={`grid grid-flow-col-dense justify-start items-center 
                  cursor-pointer w-full py-3 rounded-xl mb-1 
                  ${item.slug === activeMenu ? 'bg-gradient-to-br from-blue-500 to-blue-400 shadow-blueLg' : 'hover:bg-gray-100'} `}
                  onClick={() => {
                    setactiveMenu(item.slug)
                    props.changeMenu(item.slug)
                  }}
                >
                  <div className={`ml-3 ${item.slug === activeMenu ? 'text-white' : 'text-gray-500'}`} >
                    {
                      item.slug === 'kelola_karyawan' ? 
                      <RiParentLine size={18} /> :
                      item.slug === 'kelola_penggajian' ?
                      <FaRegMoneyBillAlt size={18} /> : 
                      <RiSettings5Line size={18} />
                    }
                  </div>
                  <div 
                    className={`
                    text-md ml-3 tracking-wide
                    ${item.slug === activeMenu ? 'text-white font-medium' : 'text-gray-500 font-semibold'}
                    `}
                  >
                    {item.name}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* <div className='px-3'> */}
      <button className='px-3 mb-3' onClick={()=>alert('ahoyy')}>
        <div className='grid grid-flow-col-dense justify-start items-center cursor-pointer w-full py-3 rounded-xl hover:bg-gray-100'>
          <div className='flex'>
            <div className={`ml-3 text-gray-500`} >
              <RiLogoutBoxRLine size={18}/>
            </div>
            <div
              className={`text-md ml-3 tracking-wide text-gray-500 font-semibold`}
            >
              Logout
            </div>
          </div>
        </div>
      </button>
      {/* </div> */}
    </div>
  )
}

export default React.memo(MenuKelola)
