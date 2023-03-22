import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/order.module.scss'
import { FiArrowLeft } from 'react-icons/fi'
import { api } from '@/Services/apiClient'
const Finish = () => {
  const router = useRouter();
  const {table, id} = router.query;

  function handleReturn(){
    router.back()
  }

  async function handleFinish () {
    await api.put('/orders/update',{
      order_id: id
    })
    router.push('/dashboard')
    localStorage.removeItem('productAdd')
  }
  
  return (
    <main className={styles.container}>
      <button className={styles.btnBack} onClick={handleReturn}>
        <FiArrowLeft size={25} color='#fff'/>
      </button>
      <h1>Você deseja finalizar o pedido?</h1>
      <span className={styles.finish}>Mesa: {table}</span>
      <button className={styles.btnFinish} onClick={handleFinish}>Finalizar pedido</button>
    </main>
  )
}

export default Finish
