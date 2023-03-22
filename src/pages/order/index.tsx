import React from 'react'
import styles from '../../../styles/order.module.scss'
import { Button } from '@/Components/Button'
import { Input } from '@/Components/Input'
import { api } from '@/Services/apiClient'
import { canSSRAuth } from '@/Utils/CanSSRAuth'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'


const Pedido = () => {
  const router = useRouter()
  const [table, setTable] = React.useState(''); 
  
  async function handleCreateOrder(){
    if(table === ''){
      toast.error('Preencha o número da mesa')
      return
    }
    const response = await api.post('/orders', {
      table: Number(table)
    })
    console.log(response.data)
    const {id} = response.data
    router.push(`/order/initial?table=${table}&id=${id}`)
  }

  return (
    <div className={styles.container}>
      <h1>Novo pedido</h1>
      <span>Número da mesa:</span>
      <Input 
        type='text'
        placeholder='Digite o número da mesa'
        value={table}
        onChange={({target}) => setTable(target.value)}
      />
      <Button onClick={handleCreateOrder}>Abrir mesa</Button>
    </div>
  )
}

export default Pedido

export const getServerSideProps = canSSRAuth (async (ctx) =>{
  return {
    props:{}
  }
})