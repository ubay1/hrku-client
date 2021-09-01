import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HTTPGetProfil } from '../../api/user'
import Header from '../../components/Header'
import { Base } from '../../layout/base'
import { AppDispatch } from '../../store'
import { RootState } from '../../store/rootReducer'
import { setAuthStatus } from '../../store/user'
import Cookies from "js-cookie";
import Logo from "../../assets/images/hrlogo.png";
import Image from "next/image";
import { RiMailLine, RiMapPin2Line, RiMenLine, RiPhoneLine, RiQuestionLine, RiWomenLine } from 'react-icons/ri'


export async function getServerSideProps(context: any) {
  
  try {
    const replaceToken = context.req.headers.cookie.replace('token=', '')
    const response = await HTTPGetProfil({token: replaceToken})
    console.log(response.data)
    const data = response.data.data
    return {
      props: {
        data: data
      },
    }
  } catch (error) {
    return {
      props: {
        data: error
      },
    }
  }
}

interface IDataUser {
  data: {
    fullname: string;
    address: string;
    phone: string;
    email: string;
    foto: any;
    gender: any;
    role: { 
      role_name: string, 
      slug_role_name: string
    }
  }
}
const Profil = ({data}: IDataUser) => {
  return (
    <div>
      <Base>
        <div className="h-screen profil bg-white">
          <Header />

          <div className=" flex flex-col justify-center items-center">
            <div className="card mt-6 mb-11 flex flex-col justify-center items-center rounded-lg shadow-lg w-8/12">
              <div className="bg-foto py-4 flex flex-col justify-center items-center relative  h-full w-full">
                <div className="bg-foto-backdrop"></div>
                <div className="foto mt-4">
                  {
                    <Image 
                      className="rounded-full pointer-events-none"
                      blurDataURL="https://cdn.antaranews.com/cache/800x533/2021/01/08/elon.jpg"
                      placeholder="blur"
                      src="https://cdn.antaranews.com/cache/800x533/2021/01/08/elon.jpg"
                      width="100" height="100"
                      objectFit="cover"
                      layout="fixed" 
                    />
                    ??
                    <Image 
                      className="rounded-full pointer-events-none"
                      blurDataURL={data.foto}
                      placeholder="blur"
                      src={data.foto}
                      width="100" height="100"
                      objectFit="cover"
                      layout="fixed" 
                    />
                  }
                </div>
                <div className="role relative flex flex-col items-center justify-center">
                  <div className="fullname text-lg text-white font-bold">{data.fullname}</div>
                  <div className="rolename bg-red-500 px-2 rounded-md text-white">{data.role.role_name}</div>
                </div>
              </div>

              <div className="detailuser w-full mt-6 mb-6 flex justify-around items-center">
                <div className="email flex flex-col text-sm justify-center items-center">
                  <div className="bg-red-50 p-2 rounded-full">
                    <RiMailLine color="red" size="20px"/>
                  </div>
                  {data.email}
                </div>
                <div className="phone flex flex-col text-sm justify-center items-center">
                  <div className="bg-green-50 p-2 rounded-full">
                    <RiPhoneLine color="green" size="20px"/>
                  </div>
                  {data.phone}
                </div>
                <div className="address flex flex-col text-sm justify-center items-center">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <RiMapPin2Line color="blue" size="20px"/>
                  </div>
                  {data.address}
                </div>
                <div className="gender flex flex-col text-sm justify-center items-center">
                  <div className="bg-yellow-50 p-2 rounded-full">
                    { data.gender === null ? <RiQuestionLine color="orange" size="20px"/> : 
                      data.gender === 'P' ? <RiWomenLine color="orange" size="20px"/> :
                      <RiMenLine color="orange" size="20px"/>
                    }
                  </div>
                  {'unknown' ?? data.gender}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Base>
    </div>
  )
}

export default Profil
