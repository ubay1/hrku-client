import React, { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

interface IHeaderKelola {
  title: string;
  searchData?: any;
}

const HeaderKelola = (props: IHeaderKelola) => {
  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const [valueSearchData, setvalueSearchData] = useState('')
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  function handleChangeInputSearch(event: any) {
    setvalueSearchData(event.target.value);
  }
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  
  return (
    <div className='flex justify-between items-center py-4'>
      <div className='judul text-lg pt-4 pb-4 font-semibold'>
        {props.title}
      </div>
      <div className='relative'>
        <input 
          className='rounded-xl p-3 pr-12 bg-white focus:shadow-md focus:outline-none' 
          type="text"
          placeholder='Cari karyawan'
          value={valueSearchData}
          onChange={handleChangeInputSearch}
        />
        <button 
          className='flex justify-center items-center bg-blue-500 rounded-xl absolute top-1 right-1 h-5/6 w-9 hover:bg-blue-600'
          onClick={() => {
            props.searchData(valueSearchData)
          }}
        >
          <RiSearch2Line color='#fff' size={18}/>
        </button>
      </div>
    </div>
  )
}

export default HeaderKelola
