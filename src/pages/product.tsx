import React, { ChangeEvent, FormEvent } from 'react'
import styles from '../../styles/product.module.scss'
import Head from 'next/head'
import Header from '@/Components/Header'
import { canSSRAuth } from '@/Utils/CanSSRAuth'
import { setupAPICliente } from '@/Services/api'
import { Button } from '@/Components/Button'
import { FiUpload } from 'react-icons/fi'
import { api } from '@/Services/apiClient'
import { toast } from 'react-toastify'

// type itemProps = {
//   name: string,
//   id: string
// }
// interface CategoryProps {
//   categoryList: itemProps[];
// } 
const Product = () => {
  const [category, setCategoryList] = React.useState([]);
  const [categselect, setCategselect] = React.useState('');
  const [img, setimg] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
   
  React.useEffect(() =>{
    async function listCategory(){
      const response = await api.get('/category');
      setCategoryList(response.data.categorias);
    }
    listCategory()
  },[])

  function handleFiles (event:ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return
    }
    const image = event.target.files[0]
    if(!image){
      return
    }
    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      setimg(image)
      setAvatar(URL.createObjectURL(image))
    }
  }

  async function handleSubmit(event:FormEvent){
    event.preventDefault();
    try{
      const data = new FormData();
      if(name === '' || description === '' || price === '' || avatar === null){
        toast.error('Preencha todos os campos')
        return
      }
      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', category[categselect].id)
      data.append('file', img)
      
      await api.post('/products', data)
      toast.success('Produto cadastrado')
      setAvatar(null)
      setimg('')
      setName('')
      setPrice('')
      setDescription('')
      
    }catch(err){
      toast.error("Ops! Erro ao cadastrar");
      console.log(err)
    }
    
  }
  return (
    <>
     <Head>
       <title>Produto - Sujeito Pizza</title> 
     </Head> 
     <Header />
     <main className={styles.container}>
       <h1>Novo produto</h1>
       <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          <span>
            <FiUpload size={25} color='#fff'/>
          </span>
          <input type="file" accept='image/png, image/jpeg' onChange={handleFiles}/>
          {avatar &&
            <img 
              src={avatar} 
              alt="Foto avatar"
              className={styles.preview}
              width={250}
              height={250}
            />
          }
        </label>
        <select 
          value={categselect} 
          onChange={({target}) => setCategselect(target.value)}
        >
          {category.map((item, index) => {
            return(
              <option key={item.id} value={index}>
                {item.name}
              </option>
            )
          })}
        </select>
        <input 
          type="text" 
          placeholder='Digite o nome do produto'
          className={styles.input}
          value={name}
          onChange={({target}) => setName(target.value)}
          />
        <input 
          type="text" 
          placeholder='Preço do produto'
          className={styles.input}
          value={price}
          onChange={({target}) => setPrice(target.value)}
          />
        <textarea 
          placeholder='Descreva seu produto' 
          className={styles.input}
          value={description}
          onChange={({target}) => setDescription(target.value)}
          />
        <Button type='submit'>Cadastrar</Button>
       </form>
     </main>
    </>
  )
}

export default Product

export const getServerSideProps = canSSRAuth(async(ctx)=>{
  // const apiClient = setupAPICliente(ctx)
  // const response = await apiClient.get('/category');
  // const categories = response.data.categorias;
      // console.log(categories)  
  return{
    props:{
      // categoryList: categories
     }
  }
})