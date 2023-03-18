import Head from 'next/head'
import React, {FormEvent} from 'react'
import styles from '../../styles/category.module.scss'
import Header from '@/Components/Header'
import { api } from '@/Services/apiClient'
import { toast } from 'react-toastify'
import { Button } from '@/Components/Button'
import { canSSRAuth } from '@/Utils/CanSSRAuth'

const Category = () => {
  const [category, setCategory] = React.useState('');
  async function handleCategory (event:FormEvent){
    event.preventDefault();
    if(category === ''){
      toast.error("Preencha o campo corretamente")
      return
    }
    const response = await api.post('/category',{
      name: category      
    })
    const {name} = response.data;
    toast.success(`Categoria ${name} adicionada`);
    setCategory('');

  }
  return (
    <>
      <Head>
        <title>Nova Categoria - Sujeito Pizza</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <h1>Cadastrar nova categoria</h1>
        <form onSubmit={handleCategory} className={styles.form}>
          <input 
            type="text"
            className={styles.input}
            placeholder='Digite o nome da categoria' 
            value={category}
            onChange={({target}) => setCategory(target.value)}  
          />
          <Button type='submit'>Cadastrar</Button>
        </form>
      </main>
    </>
  )
}

export default Category

export const getServerSideProps = canSSRAuth(async(ctx) =>{
  return {
    props:{}
  }
})