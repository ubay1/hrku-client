import type { NextPage } from 'next'
import React from 'react';
import { NextSeo } from 'next-seo';
import { Base } from '../layout/base';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, Menu, MenuItem, Grid, Paper } from '@material-ui/core';
import Image from 'next/image'
import { MdAccountCircle, MdPerson } from 'react-icons/md';
import { RiArrowDownSLine, RiLogoutBoxRLine, RiTeamFill, RiParentLine, RiMoneyDollarBoxLine, RiLuggageCartLine, RiSuitcase2Line, RiCopyrightLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, store } from '../store';
import { RootState } from '../store/rootReducer';
import moment from 'moment';
import router from 'next/router';
import { HTTPSubmitLogout } from '../api/auth';
import Cookies from "js-cookie";
import Header from '../components/Header';

const dataProduct = [
  {
    icon: <div className="bg-red-50 p-2 rounded-full"><RiParentLine size="30px" color="red"/></div>, 
    title: 'kelola karyawan',
    link: 'kelola/karyawan'
  },
  {
    icon: <div className="bg-green-50 p-2 rounded-full"><RiMoneyDollarBoxLine size="30px" color="green"/></div>, 
    title: 'kelola penggajian',
    link: 'kelola/karyawan'
  },
  // {
  //   icon: <div className="bg-blue-50 p-2 rounded-full"><RiLuggageCartLine size="30px" color="blue"/></div>, 
  //   title: 'cuti karyawan',
  //   link: 'kelola/karyawan'
  // },
  {
    icon: <div className="bg-yellow-50 p-2 rounded-full"><RiSuitcase2Line size="30px" color="orange"/></div>, 
    title: 'buat lowongan',
    link: 'kelola/karyawan'
  },
]

const Home = ({data}: any) => {
  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    // console.log(data)
  }, [])
  
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const changePage = (link: string) => {
    return router.push(`/${link}`)
  };
  
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  

  
  /* -------------------------------------------------------------------------- */
  /*                                 show page                                  */
  /* -------------------------------------------------------------------------- */
  return(
    <Base>
      <div className="h-screen dashboard bg-white">
        <Header />
        
        {/* greeting */}
        <div className="greeting mx-4 mt-2 text-center phone:text-4xl xphone:text-3xl">
          Hi, Selamat Datang 
          <span className="font-bold text-red-300 greeting-name"> {userRedux.profile.fullname}</span>
        </div>

        {/* body */}
        <div className="body mx-4 mt-6">
          {dataProduct.map((item: any, index: number) => {
            return(
              <button 
                key={`key product - ${index}`} 
                className="card-product mb-2 border-gray-100 border-2 p-4 rounded-lg"
                onClick={()=>{
                  changePage(item.link)
                }}
              >
                <div className="flex items-center justify-center">{item.icon}</div>
                <div className="title mt-2 text-base capitalize">{item.title}</div>
              </button>
            )
          })}
        </div>
        
      </div>
    </Base>
  );
}

export default Home

export async function getServerSideProps(context: any) {
    if (context.req.headers.cookie === undefined) {
      return {
        redirect: {
          permanent: false,
          destination: "/login"
        }
      }
    } else {
      let replaceToken = ''
      const a = JSON.parse(JSON.stringify(context.req.headers.cookie))
      let splitt = a.split(" ");

      // console.log('token ada = ',splitt)

      for (var j = 0; j < splitt.length; j++) {
        if (splitt[j].match('token')) {
          // console.log('token ada = ', splitt[j])
          const replaceToken2 = splitt[j].replace('token=', '');
          replaceToken = replaceToken2;
        }
      }

      if (replaceToken === '') {
        return {
          redirect: {
            permanent: false,
            destination: "/login"
          }
        }
      } else {
        const data = {
          isAuth: true
        }
        return {
          props: {
            data: data
          },
        }
      }
    }
}