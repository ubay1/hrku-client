import React from 'react'

const About = ({data}: any) => {
  return (
    <div>
      ini about us
      {data}
    </div>
  )
}

export default About

export async function getServerSideProps(context: any) {
  console.log(context.req.headers.cookie)
  return{
    props: {
      data: 'test'
    }
  }
}