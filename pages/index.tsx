import React, { useMemo, useState } from 'react'
import { Base } from '../layout/base'
import { ListMenuKelolaKaryawan, ListUser, TListMenu } from '../types/listMenu'
import { RiSettings5Line, RiHome2Line, RiSearch2Line, RiParentLine } from "react-icons/ri";
import "@fontsource/quicksand"
import "@fontsource/poppins"
import Image from 'next/image'
import router from 'next/router';
import Logo from "../assets/images/logo2.png";
import { TextField } from '@mui/material';
import HeaderKelola from '../components/kelola/Header';
import MenuKelola from '../components/kelola/Menu';
import LogoKelola from '../components/kelola/Logo';
import { FaFileSignature, FaUmbrellaBeach } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import ListTable from '../components/kelola/List';
import axios from 'axios';
import { wrapper } from '../store';
import { useAuth } from '../context/authContext';

function MemoMenus({listMenu, changeMenu}: any) {
  return(
    <MenuKelola listMenu={listMenu} changeMenu={changeMenu}/>
  )
}
// React.memo membuat component child menjadi tidak rerender.
// dia akan merender ulang jika ada perubahan pada nilai propsnya jika kita menggunakan props.
// contoh: <MemoizeHeaderKelola title={title} searchData={searchEventHandler}/>
// jika title berubah ubah maka component header akan merender ulang.
const MemoizeMenukelola = React.memo(MemoMenus)

const users = [
  { id: 1, name: 'Robin' },
  { id: 2, name: 'Dennis' },
  { id: 3, name: 'Denniss' },
  { id: 4, name: 'Dennisaa' },
];

function nilaiRandom() {
  console.log('render function nilaiRandom')
  return Math.random()
}

const Home = () => {
  console.log('render parent')
  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const { auth } = useAuth()

  const [activeMenu, setactiveMenu] = useState('')
  const [count, setcount] = useState(0)
  const [title, settitle] = React.useState('Kelola Karyawan')
  const [searchFromHeader, setsearchFromHeader] = React.useState('')

  const [loadingPage, setloadingPage] = useState<any>(null)

  React.useEffect(() => {
    // console.log('auth = ',auth)
    if (auth.status === "SIGNED_OUT") {
      setloadingPage('true')
      window.location.replace('/login')
    }
    
    if (auth.status === "SIGNED_IN") {
      setloadingPage('false')
      router.push('/')
    }
  }, [])
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  
  // pakai usecallback agar tidak rerender pada function.
  // rerender ini terjadi karna pada component child kita mengirim sebuah props function.
  // dimana disini nama function tsb yaitu searchEventHandler. 
  // contoh bentuknya: <MemoizeHeaderkelola title={title} searchData={searchEventHandler}/>
  // jika ingin menggunakan dependencies pada usecallback, maka gunakan tipe dari statenya number, jika tipenya string parent hanya bisa akses 1x, jika tipenya object/array maka child component akan terender

  const searchEventHandler = React.useCallback((data: any)=> {
    setsearchFromHeader((prevState: any) => prevState = data)
    // setcount(count+1)
    // setdataName({...dataName, name: Math.random().toString()})
    // let arrs = [...arrValue]
    // arrs[0] = Math.random()
    // setarrValue(arrs)
  }, [])

  const changeMenuEventHandler = React.useCallback((data: any)=> {
    setactiveMenu((prevState: any) => prevState = data)
  }, [])


  // useMemo berguna agar tidak terjadi render pada sebuah nilai state atau data pada function yang akan ditampilkan. 
  // misal kita memiliki sebuah function dengan mengembalikan 100 data. lalu kita juga memiliki state dengan nama user.
  // jika tanpa useMemo: jika kita update state user, maka 100 data tadi akan ikut kerender.
  const filteredUsers = React.useMemo(() => users.filter((user: any) => {
    console.log('Filter user running');
    return user.name.toLowerCase().includes(searchFromHeader.toLowerCase());
  }),[searchFromHeader])

  // jika tanpa useMemo, function ini akan dirender terus
  const randomm = useMemo(() => nilaiRandom(), [])
  
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  
  return (
    <Base footer="false" loading={loadingPage}>
      <div className='kelola_karyawan w-full h-full min-h-screen' style={{backgroundColor: '#fafafb'}}>
        <div className='sidebar_kelola_karyawan bg-white fixed left-0 w-60 h-full'>
          {/* menu sidebar */}
          <MemoizeMenukelola listMenu={ListMenuKelolaKaryawan} changeMenu={changeMenuEventHandler}/>
        </div>

        <div className="content_kelola_karyawan pl-64 pr-8">
            <HeaderKelola title={title} searchData={searchEventHandler}/>

            <div className='grid grid-cols-3 gap-6'>
              <div className='total_karyawan bg-white p-4 rounded-lg flex flex-col'>
                <div className='flex justify-center'>
                  <div className="bg-red-50 h-12 w-12 flex justify-center items-center p-2 rounded-full">
                    <RiParentLine size={35} color="red"/>
                  </div>
                </div>

                <div className='flex flex-col justify-center items-center mt-2'>
                  <div className=''>Karyawan Masuk</div>
                  <div className='mt-2 text-2xl'>10 dari <span className='font-black'>100</span></div>
                </div>
              </div>

              <div className='total_karyawan bg-white p-4 rounded-lg'>
                <div className='flex justify-center'>
                  <div className="bg-green-50 h-12 w-12 flex justify-center items-center p-2 rounded-full">
                    <FaUmbrellaBeach size={35} color="green"/>
                  </div>
                </div>

                <div className='flex flex-col justify-center items-center mt-2'>
                  <div className=''>Karyawan Cuti</div>
                  <div className='mt-2 text-2xl'>1 dari <span className='font-black'>100</span></div>
                </div>
              </div>

              <div className='total_karyawan bg-white p-4 rounded-lg'>
                <div className='flex justify-center'>
                  <div className="bg-yellow-50 h-12 w-12 flex justify-center items-center p-2 rounded-full">
                    <FaFileSignature size={35} color="orange"/>
                  </div>
                </div>

                <div className='flex flex-col justify-center items-center mt-2'>
                  <div className=''>Karyawan Sakit/Izin</div>
                  <div className='mt-2 text-2xl'>5 dari <span className='font-black'>100</span></div>
                </div>
              </div>
            </div>

            <ListTable list={filteredUsers}/>

              {randomm}
            <div>
            </div>

            {/* <button className='bg-red-400 m-2 p-2' onClick={() => {
              setcount(count+1)
            }}>test</button>
            <div>{count}</div>
            <div>{searchFromHeader}</div>
            <div>{activeMenu}</div> */}
        </div>
      </div>
    </Base>
  )
}

export default Home

// export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
//   // await store.dispatch(fetchSubject(id));
//   if (context.req.headers.cookie === undefined) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login"
//       }
//     }
//   } else {
//     let replaceToken = ''
//     const a = JSON.parse(JSON.stringify(context.req.headers.cookie))
//     let splitt = a.split(" ");

//     // console.log('token ada = ',splitt)

//     for (var j = 0; j < splitt.length; j++) {
//       if (splitt[j].match('token')) {
//         // console.log('token ada = ', splitt[j])
//         const replaceToken2 = splitt[j].replace('token=', '');
//         replaceToken = replaceToken2;
//       }
//     }

//     if (replaceToken === '') {
//       return {
//         redirect: {
//           permanent: false,
//           destination: "/login"
//         }
//       }
//     } else {
//       const data = {
//         isAuth: true
//       }
//       return {
//         props: {
//           data: data
//         },
//       }
//     }
//   }

//   // console.log(context)
//   // console.log('State on server', store.getState());

//   // const data = {
//   //   isAuth: true
//   // }
//   // return {
//   //     props: {
//   //       data: data
//   //     },
//   // };
// });