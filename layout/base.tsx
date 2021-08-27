import React, { useEffect } from "react";
import Image from 'next/image'
import Logo from "../assets/images/hrlogo.png";
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { RiMenu3Fill,RiArrowDownSLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { AppDispatch } from "../store";
import { initialStateUserAuthByAsync } from "../store/user";
import { setLoading } from "../store/loading";
import Lottie from "lottie-react";
import LoadingScreen from '../assets/lottie_file/loading-book.json';
import Cookies from "js-cookie";
import router from "next/router";

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
}));

export const Base: React.FC = ({children}) => {
  const classes = useStyles()

  const tokenCookies = Cookies.get('token')

  /* -------------------------------------------------------------------------- */
  /*                                 state redux                                */
  /* -------------------------------------------------------------------------- */
  const loading = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch()
  
  /* -------------------------------------------------------------------------- */
  /*                                    state                                   */
  /* -------------------------------------------------------------------------- */
  const [anchorEl, setAnchorEl] = React.useState(null);

  /* -------------------------------------------------------------------------- */
  /*                                  hooks                                     */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    // console.log(tokenCookies)
    if (tokenCookies === '' || tokenCookies === undefined) {
      router.push('/login')
    } else {
      if (userRedux.token !== '') {
        dispatch(setLoading({show: false}))
      } else {
        initialStateUserAuthByAsync(dispatch)
      }
    }
  }, [dispatch, userRedux.token])

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  if (loading.show === true) {
    return(
      <div className="flex items-center justify-center flex-col h-screen">
        <Lottie animationData={LoadingScreen} style={{ width: 200 }} />
      </div>
    )
  } else {
    return(
      <div>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <RiMenu3Fill color="#fff"/>
            </IconButton> */}
            <Typography variant="h6" className={`${classes.title} text-white`}>
              HR-KU
            </Typography>
            <Button 
              color="primary" 
              variant="text"
              aria-controls="simple-menu" 
              aria-haspopup="true" 
              onClick={handleClick}
            >
              <Typography 
                variant="button" 
                className={`${classes.title}  text-white flex items-center justify-center`}>
                {<MdAccountCircle size="25px" /> ?? <img src={userRedux.profile.foto} alt="" /> } <RiArrowDownSLine size="20px"/>
              </Typography>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        {children}
      </div>
    );
  }
}