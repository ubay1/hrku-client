import { CircularProgress } from '@material-ui/core'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'

const Auth = (props: {children:any, loading:any}) => {

  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const {auth} = useAuth()
  
  React.useEffect(() => {
    console.log('auth auth = ',auth)
  }, [])
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
    <div>
      <NextSeo
        title="HRKU All In One Apps"
        description="Hrku adalah aplikasi AllInOne yang dibuat untuk memudahkan HRD dalam mengelola penggajian, data karyawan, cuti karyawan, dll."
      />
      {
        props.loading === 'true' || props.loading === null ?
          <div className='h-full min-h-screen flex flex-col justify-center items-center'>
            <CircularProgress />
            {/* <div className=''>
              Memuat halaman ..
            </div> */}
          </div>
        : props.children
      }
    </div>
  )
}

export default Auth
