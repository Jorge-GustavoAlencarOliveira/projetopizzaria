import { canSSRAuth } from '@/Utils/CanSSRAuth'
import React from 'react'
import Head from 'next/head'
import Header from '@/Components/Header'
const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria</title>
      </Head>
      <Header />
      <div>
        Dashboard
      </div>
    </>
  )
}

export default Dashboard

export const getServerSideProps = canSSRAuth( async(ctx) =>{
  return {
    props:{}
  }
})