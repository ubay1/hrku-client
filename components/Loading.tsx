/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../assets/loading.gif';
import { AppDispatch } from '../store';
import { RootState } from '../store/rootReducer';
import { setLoadingShow } from '../store/loading';
import Lottie from 'lottie-react';
import LoadingAction from '../assets/lottie_file/loading.json';

const Loading = () => {
  const loading = useSelector((state: RootState) => state.loading)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (loading.show === true) {
      console.log("triger timmer")
      let timer = setTimeout(() => {
        console.log("Timeout Process Please Try Again")
        dispatch(setLoadingShow(false))
      }, loading.timeout);
      return () => {
        clearTimeout(timer)
        dispatch(setLoadingShow(false))
      };
    }
  }, [loading])

  return (
    <div>
      {
        loading.show === true ?
        <div 
          className="w-full h-full bg-black bg-opacity-80 fixed text-white z-140 flex justify-center top-0"
        >
          <div className="loading-body flex items-center">
            <Lottie animationData={LoadingAction} style={{ width: 500 }} />
          </div>
        </div> : 
        <div></div>
      }
    </div>
  )
}

export default Loading;