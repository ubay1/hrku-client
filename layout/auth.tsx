import { CircularProgress } from '@material-ui/core'
import Lottie from 'lottie-react'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../context/authContext'
import { AppDispatch } from '../store'
import { RootState } from '../store/rootReducer'
import LoadingScreen from '../assets/lottie_file/loading-searching.json';
import { setLoading } from '../store/loading'

const Auth = (props: {children:any, loading:any}) => {

  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const {auth} = useAuth()
  
  const dispatch: AppDispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);
  
  React.useEffect(() => {
    console.log('auth auth = ',auth)
    dispatch(setLoading({show: false}))
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
  if (loading.show === true) {
    return(
      <div className="bg-loading flex items-center justify-center flex-col h-screen">
        <NextSeo
          title="HRKU All In One Apps"
          description="Hrku adalah aplikasi AllInOne yang dibuat untuk memudahkan HRD dalam mengelola penggajian, data karyawan, cuti karyawan, dll."
        />
        <Lottie animationData={LoadingScreen} style={{ width: 200 }} />
      </div>
    )
  } else {
    return (
      <div>
        <NextSeo
          title="HRKU All In One Apps"
          description="Hrku adalah aplikasi AllInOne yang dibuat untuk memudahkan HRD dalam mengelola penggajian, data karyawan, cuti karyawan, dll."
        />
        {
          props.loading === 'true' || props.loading === null ?
            <div className='h-full min-h-screen flex flex-col justify-center items-center'>
              <Lottie animationData={LoadingScreen} style={{ width: 200 }} />
              {/* <div className=''>
                Memuat halaman ..
              </div> */}
            </div>
          : props.children
        }
      </div>
    )
  }
}

export default Auth
