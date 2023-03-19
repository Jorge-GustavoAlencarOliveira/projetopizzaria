import { canSSRAuth } from '@/Utils/CanSSRAuth'
import React from 'react'
import Head from 'next/head'
import Header from '@/Components/Header'
import styles from '../../styles/dashboard.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPICliente } from '@/Services/api'
import { api } from '@/Services/apiClient'
import Modal from '@/Components/Modal'
import { toast } from 'react-toastify'

// type OrdersProps = {
//   name?: string | null,
//   id: string,
//   table: string | number,
//   draft: boolean,
//   status: boolean,
// }

// interface listProps{
//   ordersList: OrdersProps[];
// }

const Dashboard = () => {
  
  React.useEffect(() => {
    async function listOrders(){
      const response = await api.get('/orders/list')
      setOrders(response.data)
    }
    listOrders();
  })
   
  const [orders, setOrders] = React.useState([]);
  const [detail, setDetail] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [soma, setSoma] = React.useState(0);

  async function handleModal(order_id : string){
    const response = await api.get('/orders/detail',{
      params:{
        order_id: order_id
      }
    })
    setDetail(response.data);
    let order = []
    response.data.map(item => {
      return (
        order.push(item.product.price * item.amount)
        )
      })   
    const somar = order.reduce((acc, curr) => acc + curr)
    setModal(true)
    setSoma(somar)
  }
  
  async function uptdateOrders(order_id : string){
    await api.put('/orders/close', {
      order_id: order_id
    })
    toast.success("Pedido concluído");
    const response = await api.get('/orders/list');
    setOrders(response.data)
    setModal(false)
  }
  async function handleUptade (){
    const response = await api.get('/orders/list');
    setOrders(response.data) 
  }

  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <div className={styles.header}>
          <h1>Últimos pedidos</h1>
          <button onClick={handleUptade}>
            <FiRefreshCcw size={25} color='3fffa3'/>
          </button>
        </div>
        {orders.length === 0 ? <span className={styles.empty}>Não há pedidos no momento...</span>:
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
        }
        <Modal detail={detail} modal={modal} setModal={setModal} soma={soma} finish={uptdateOrders}/>
      </main>
    </>
  )
}

export default Dashboard

export const getServerSideProps = canSSRAuth( async(ctx) =>{
  // const api = setupAPICliente(ctx);
  // const response = await api.get('/orders/list')
  // const orders = response.data
  // console.log(orders)
  
  return {
    props:{
      // ordersList: orders
    }
  }
})