import { Button, Typography, Menu, MenuItem, makeStyles } from '@material-ui/core';
import router from 'next/router';
import React from 'react'
import { MdAccountCircle, MdPerson } from 'react-icons/md';
import { RiArrowDownSLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { HTTPSubmitLogout } from '../api/auth';
import Cookies from "js-cookie";
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { RootState } from '../store/rootReducer';
import Logo from "../assets/images/hrlogo.png";
import Blank from "../assets/images/blank.png";
import moment from 'moment';


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

const Header = () => {
  
  const classes = useStyles()

  /* -------------------------------------------------------------------------- */
  /*                                 state redux                                */
  /* -------------------------------------------------------------------------- */
  const loading = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch()
  
  const myAvatar = process.env.PHOTO_URL+(userRedux.profile.foto as any)+'?'+moment()
  /* -------------------------------------------------------------------------- */
  /*                                    state                                   */
  /* -------------------------------------------------------------------------- */
  const [anchorEl, setAnchorEl] = React.useState(null);
  React.useEffect(() => {
    return () => {
      myAvatar
    }
  }, [myAvatar])

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
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
        Cookies.remove('token')
        window.location.replace('/login')
      }
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <div>
      {/* header */}
      <div className="header p-4 flex justify-between items-center">
        <div className="logo">
          <button onClick={gotoHome}>
            <Image src={Logo} width="50" height="50" className="pointer-events-none" />
          </button>
        </div>
        <div className="foto">
          <Button
            color="default"
            variant="text"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Typography
              variant="button"
              className={`${classes.title}  text-black flex items-center justify-center`}>
              {
                userRedux.profile.foto ?
                <Image 
                  className="rounded-full pointer-events-none"
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
                  className="rounded-full pointer-events-none"
                  blurDataURL={Blank as any}
                  placeholder="blur"
                  src={Blank}
                  width="40" height="40"
                  objectFit="cover"
                  layout="fixed" 
                /> 
              } <RiArrowDownSLine size="20px" />
            </Typography>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={gotoProfil}>
              <MdPerson size="20px" className="mr-2" /> Profile
            </MenuItem>
            <MenuItem onClick={doLogout}>
              <RiLogoutBoxRLine size="20px" className="mr-2" /> Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Header
