import { Button, Typography, Menu, MenuItem, makeStyles } from '@material-ui/core';
import router from 'next/router';
import React, { memo, useState } from 'react'
import { MdPerson } from 'react-icons/md';
import { RiArrowDownSLine, RiLogoutBoxRLine, RiSearch2Line } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux';
import { toast, Slide } from 'react-toastify';
import { HTTPSubmitLogout } from '../../api/auth';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/rootReducer';
import { setAuthFalse } from '../../store/user';
import Image from 'next/image'
import Blank from "../../assets/images/blank.png";
import moment from 'moment';

interface IHeaderKelola {
  title: string;
  searchData?: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

const HeaderKelola = (props: IHeaderKelola) => {
  toast.configure()
  console.log('render child header')
  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const classes = useStyles()
  const loading = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch()

  const myAvatar = process.env.PHOTO_URL+(userRedux.profile.foto as any)+'?'+moment()

  const wrapperRef = React.useRef<any>(null);
  useOutsideAlerter(wrapperRef);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDropdownUser, setopenDropdownUser] = React.useState(false);

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

  function useOutsideAlerter(ref: any) {
    React.useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setopenDropdownUser(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoProfil = () => {
    router.push('/profil')
  };

  const gotoHome = ()=> {
    router.push('/')
  }

  const doLogout = async () => {
    try {
      const response = await HTTPSubmitLogout({token: userRedux.token})

      if (response.status === 201) {
        toast('anda telah keluar dari aplikasi', {
          position: "bottom-right",
          autoClose: 5000,
          type: 'success',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          transition: Slide
        })

        // window.location.replace('/login')

        dispatch(setAuthFalse({
          token: ''
        }))
        // dispatch(setReduxUsersProfile({
        //   fullname: '',
        //   address: '',
        //   phone: '',
        //   email: '',
        //   role_name: '',
        //   slug_role_name: '',
        //   foto: '',
        //   gender: '',
        // }))
      }
    } catch (error) {
      console.log(error)
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  
  return (
    <div className='flex justify-between items-center py-4'>
      <div className='judul text-lg pt-4 pb-4 font-semibold'>
        {props.title}
      </div>

      <div className='flex justify-end gap-3'>
        <div className='relative h-11'>
          <input 
            className='rounded-xl p-3 shadow-md h-full pr-12 bg-white focus:shadow-md focus:outline-none' 
            type="text"
            placeholder='Cari karyawan'
            value={valueSearchData}
            onChange={handleChangeInputSearch}
          />
          <div className='h-full absolute top-0 right-1 flex justify-center items-center'>
            <button 
              className='flex justify-center items-center bg-blue-500 rounded-xl  h-9 w-9 hover:bg-blue-600'
              onClick={() => {
                props.searchData(valueSearchData)
              }}
            >
              <RiSearch2Line color='#fff' size={18}/>
            </button>
          </div>
        </div>

        <div className='relative h-11'>
          <div 
            className='bg-white shadow-md rounded-xl h-full flex justify-center items-center cursor-pointer'
            onClick={()=>{
              setopenDropdownUser(!openDropdownUser)
            }}
            ref={wrapperRef}
          >
            <div className='ml-1 h-full flex justify-center items-center'>
              {
                userRedux.profile.foto ?
                <Image 
                  className=" rounded-xl pointer-events-none"
                  blurDataURL={myAvatar}
                  placeholder="blur"
                  src={myAvatar}
                  width="40"
                  height="40"
                  layout="intrinsic"
                  objectFit="cover"
                />
                :
                <Image 
                  className=" rounded-xl pointer-events-none"
                  src={Blank}
                  width="37" 
                  height="37"
                  layout="intrinsic"
                  objectFit="cover"
                /> 
              }
            </div>

            <div className='font-bold capitalize text-md mx-2 truncate w-28'>
              {userRedux.profile.fullname}
            </div>
            <div className='mr-2'>
              <RiArrowDownSLine size="20px" />
            </div>
          </div>
          
          <div 
            // ref={wrapperRef}
            className={
              `absolute right-1 z-10 ${openDropdownUser ? 'menu-profil opacity-100 top-12' : 'transition-opacity opacity-0'} bg-white w-9/12 shadow-lg p-2 rounded-md`
            }
          >
            <div className='flex'> 
              <MdPerson size="20px" className="mr-2" /> Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(HeaderKelola)
