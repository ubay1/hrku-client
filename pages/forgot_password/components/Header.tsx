import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import {useRouter} from 'next/router';
import React from 'react'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';

const useStyles = makeStyles({
  bgPrimary: {
    backgroundColor: blue[500]
  },
  colorPrimary: {
    color: blue[500]
  }
});

const Header = (props: {step: number, title: string, show2?:boolean, title2?: string, routeName?:any}) => {
  toast.configure()
  const classes = useStyles();
  const router = useRouter()

  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  
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
    <div className={`h-14 ${classes.bgPrimary} flex justify-between items-center pl-4 pr-4`}>
      <div className="flex">
        <RiArrowLeftLine 
          color="#fff" 
          size="25" 
          onClick={() => {
            props.step === 1 ?
            router.push('/login') :
            router.back()
          }} 
          className="cursor-pointer"
          />
        <h3 className="text-white text-base ml-4">{props.title}</h3>
      </div>

      <div className={`${props.show2 === true ? 'flex' : 'hidden'}`}>
        <h3 className="text-white text-base mr-4">{props.title2}</h3>
        <RiArrowRightLine 
          color="#fff" 
          size="25" 
          onClick={() => { router.push(props.routeName) }} 
          className="cursor-pointer"
          />
      </div>
    </div>
  )
}

export default Header
