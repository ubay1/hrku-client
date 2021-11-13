import React, { useState } from 'react'
import { RiParentLine, RiSettings5Line } from 'react-icons/ri'
import { FaMoneyBillWave } from 'react-icons/fa'
import { TListMenu } from '../../types/listMenu'

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
                  <FaMoneyBillWave size={18} /> : 
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
  )
}

export default React.memo(MenuKelola)
