import { canSSRAuth } from '@/Utils/CanSSRAuth'
import React from 'react'
import Head from 'next/head'
import Header from '@/Components/Header'
import styles from '../../styles/dashboard.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPICliente } from '@/Services/api'

type OrdersProps = {
  name?: string | null,
  id: string,
  table: string | number,
  draft: boolean,
  status: boolean,
}

interface listProps{
  ordersList: OrdersProps[];
}

const Dashboard = ({ordersList}:listProps) => {
  const [orders, setOrders] = React.useState(ordersList || []);

  function handleModal(order_id : string){
    alert(order_id)
  }
  if(ordersList){
    return (
      <>
        <Head>
          <title>Painel - Sujeito Pizzaria</title>
        </Head>
        <Header />
        <main className={styles.container}>
          <div className={styles.header}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color='3fffa3'/>
            </button>
          </div>
          <article className={styles.listOrders}>
            {orders.map(item => {
              return(
                <section key={item.id} className={styles.orderItem}>
                  <button onClick={() => handleModal(item.id)}>
                    <div className={styles.tag}></div>
                    <span>Mesa {item.table}</span>
                  </button>
                </section>
              )
            })}
          </article>
        </main>
      </>
    )
  } else{
    return(
      <>
        Dashboard
      </>
    )
  }

}

export default Dashboard

export const getServerSideProps = canSSRAuth( async(ctx) =>{
  const api = setupAPICliente(ctx);
  const response = await api.get('/orders/list')
  const orders = response.data
  console.log(orders)
  if(orders){
    return {
      props:{
        ordersList: orders
      }
    }
  }
  return null
})