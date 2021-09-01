import type { NextPage } from 'next'
import React from 'react';
import { NextSeo } from 'next-seo';
import { Base } from '../layout/base';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, Menu, MenuItem, Grid, Paper } from '@material-ui/core';
import Image from 'next/image'
import { MdAccountCircle, MdPerson } from 'react-icons/md';
import { RiArrowDownSLine, RiLogoutBoxRLine, RiTeamFill, RiParentLine, RiMoneyDollarBoxLine, RiUserVoiceLine, RiSuitcase2Line, RiCopyrightLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { RootState } from '../store/rootReducer';
import moment from 'moment';
import router from 'next/router';
import { HTTPSubmitLogout } from '../api/auth';
import Cookies from "js-cookie";
import Header from '../components/Header';

const dataProduct = [
  {icon: <div className="bg-red-50 p-2 rounded-full"><RiParentLine size="30px" color="red"/></div>, 
  title: 'kelola karyawan'},
  {icon: <div className="bg-green-50 p-2 rounded-full"><RiMoneyDollarBoxLine size="30px" color="green"/></div>, 
  title: 'kelola penggajian'},
  {icon: <div className="bg-blue-50 p-2 rounded-full"><RiUserVoiceLine size="30px" color="blue"/></div>, 
  title: 'cuti karyawan'},
  {icon: <div className="bg-yellow-50 p-2 rounded-full"><RiSuitcase2Line size="30px" color="orange"/></div>, 
  title: 'buat lowongan'},
]

const Home: NextPage = () => {

  /* -------------------------------------------------------------------------- */
  /*                                 state redux                                */
  /* -------------------------------------------------------------------------- */
  const loading = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch()
  
  return(
    <Base>
      <div className="h-screen dashboard bg-white">
        <Header />
        
        {/* greeting */}
        <div className="greeting mx-4 mt-2 text-center phone:text-4xl xphone:text-3xl">
          Hi, Selamat Datang 
          <span className="font-bold text-red-300"> {userRedux.profile.fullname}</span>
        </div>

        {/* body */}
        <div className="body mx-4 mt-6">
          {dataProduct.map((item: any, index: number) => {
            return(
              <div key={`key product - ${index}`} className="card-product mb-2 border-gray-100 border-2 p-4 rounded-lg">
                <div className="flex items-center justify-center">{item.icon}</div>
                <div className="title mt-2 text-base capitalize">{item.title}</div>
              </div>
            )
          })}
        </div>
        
      </div>
    </Base>
  );
}

export default Home
