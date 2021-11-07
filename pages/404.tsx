import React from 'react'
import Image from 'next/image'
import Image404 from "../assets/images/404.svg";
import { Base } from '../layout/base';

const NotFoundPage = () => {
  return (
    <Base>
      <div className="h-full min-h-screen flex flex-col items-center justify-center">
        <div>
          <Image src={Image404} width="300" height="300" className="pointer-events-none" />
        </div>
        <div className="capitalize">halaman tidak ditemukan</div>
      </div>
    </Base>
  )
}

export default NotFoundPage
