import React, { useEffect } from "react";
import Image from 'next/image'
import Logo from "../assets/images/hrlogo.png";
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from "@material-ui/core";
import { RiMenu3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { AppDispatch } from "../store";
import { initialStateUserAuthByAsync } from "../store/user";
import { setLoading } from "../store/loading";
import Lottie from "lottie-react";
import LoadingScreen from '../assets/lottie_file/loading-book.json';

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

  const loading = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch()
  
  useEffect(() => {
    if (userRedux.token !== '') {
      dispatch(setLoading({show: false}))
    } else {
      initialStateUserAuthByAsync(dispatch)
    }
  }, [dispatch, userRedux.token])

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
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <RiMenu3Fill color="#fff"/>
            </IconButton>
            <Typography variant="h6" className={`${classes.title} text-white`}>
              News
            </Typography>
            <Button color="secondary" variant="text">
              <Typography variant="button" className={`${classes.title}  text-white`}>
                {userRedux.profile.fullname}
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
        {children}
      </div>
    );
  }
}