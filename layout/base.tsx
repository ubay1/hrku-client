import React, { useEffect } from "react";
import Image from 'next/image'
import Logo from "../assets/images/hrlogo.png";
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { RiMenu3Fill,RiArrowDownSLine, RiLogoutBoxRLine, RiCopyrightLine } from "react-icons/ri";
import { MdAccountCircle, MdPerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { AppDispatch } from "../store";
import { initialStateUserAuthByAsync } from "../store/user";
import { setLoading } from "../store/loading";
import Lottie from "lottie-react";
import LoadingScreen from '../assets/lottie_file/loading-book.json';
import Cookies from "js-cookie";
import router from "next/router";
import { NextSeo } from "next-seo";
import moment from "moment";

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

export const Base: React.FC = ({children}, page) => {
  const classes = useStyles()
  
  const yearNow = moment().format('YYYY')

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
    // console.log(userRedux)
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
      <div className="bg-loading flex items-center justify-center flex-col h-screen">
        <NextSeo
          title="HRKU All In One Apps"
          description="Hrku adalah aplikasi AllInOne yang dibuat untuk memudahkan HRD dalam mengelola penggajian, data karyawan, cuti karyawan, dll."
        />
        <Lottie animationData={LoadingScreen} style={{ width: 200 }} />
      </div>
    )
  } else {
    return(
      <div>
        <NextSeo
          title="HRKU All In One Apps"
          description="Hrku adalah aplikasi AllInOne yang dibuat untuk memudahkan HRD dalam mengelola penggajian, data karyawan, cuti karyawan, dll."
        />
        {children}

        {/* footer */}
        <div className="footer flex justify-center py-4 bg-white text-gray-300 items-center bottom-0 w-full">
          <RiCopyrightLine size="18px" /> HRKU  {yearNow}
        </div>
      </div>
    );
  }
}