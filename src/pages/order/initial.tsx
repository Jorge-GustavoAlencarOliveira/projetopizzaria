import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/order.module.scss'
import { canSSRAuth } from '@/Utils/CanSSRAuth'
import { FiTrash2 } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import { api } from '@/Services/apiClient'

const id = () => {
  const router = useRouter();
  const {table, id} = router.query;
  const [category, setCategory] = React.useState([]);
  const [categselect, setCategselect] = React.useState('');
  const [listproduct, setListproduct] = React.useState([]);
  const [prodselect, setProdSelect] = React.useState('');
  const [quant, setQuant] = React.useState('');
  const [itemAdd, setItemAdd] = React.useState([]);
  const [advanced, setAdvanced] = React.useState(true) 

  React.useEffect(() =>{
   const productStorage = localStorage.getItem('productAdd');
   const array = JSON.parse(productStorage)
   if( array?.length !== 0){
    setAdvanced(false)
   }
   return () => setItemAdd(JSON.parse(productStorage) || [])
  },[])
  
  React.useEffect(() =>{
    async function listCategories() {
      const response = await api.get('/category');
      const categories = response.data.categorias
      setCategory(categories)
    } 
    listCategories()
  },[])

  React.useEffect(() =>{
    async function listProducts(){
      let cat_id = category[categselect];
      if(cat_id){
        const response = await api.get('/products',{
          params:{
            category_id: cat_id?.id
          }
        })
        setListproduct(response.data)
      }
    }
    listProducts()
  },[categselect])

  async function handleDelete(){
    await api.delete('/orders/delete',{
      params:{
        order_id: id
      }
    })
    router.back()
  }

  async function addItem(){
    const response = await api.post('/orders/items', {
        order_id: id,
        product_id: listproduct[prodselect]?.id,
        amount: Number(quant)  
    })    
    setItemAdd(item => [...item, [listproduct[prodselect]?.name, response.data.id, quant]]);
    setAdvanced(false)
  }

  React.useEffect(() =>{
    localStorage.setItem('productAdd', JSON.stringify(itemAdd))
  },[addItem])
 
  async function itemDelete(item_id){
    await api.delete('/orders/items/delete',{
      params:{
        item_id: item_id
      }
    })
    const removeItem = itemAdd.filter(item => {
      return item[1] !== item_id
    })
    setItemAdd(removeItem)
    localStorage.setItem('productAdd', JSON.stringify(removeItem))
    if(removeItem.length === 0){
      setAdvanced(true);
    }
  } 
  
  function handleNext(){
    router.push(`/order/finish?table=${table}&id=${id}`)
  }
 
  return (
    <>
      <main className={styles.container}>
        <div className={styles.title}>
          <h1>Mesa {table}</h1>
          {itemAdd.length === 0 &&
            <button onClick={handleDelete}>
              <FiTrash2 size={25} color='#ff3f4b'/>
            </button>
          }
        </div>
        <div>
          <select value={categselect}
          onChange={({target}) => setCategselect(target.value)}
          >
            <option value='' disabled>Selecione a categoria</option>
            {category.map((item, index )=> {
              return(
                <option key={item.id} value={index}>{item.name}</option>
              )
            })}
          </select>
          <select value={prodselect}
            onChange={({target}) => setProdSelect(target.value)}>
            <option value='' disabled>Selecione o produto</option>
            {listproduct.map((item, index) =>{
              return(
                <option key={item.id} value={index}>{item.name}</option>
              )
            })}
          </select>         
        </div>
        <div className={styles.quantidade}>
          <span>Quantidade:</span>
          <input 
            type="text" 
            value={quant}
            onChange={({target}) => setQuant(target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button onClick={addItem} className={styles.btnAdd}>
            <FiPlus size={16} color='#000'/>
          </button>
          <button 
            className={styles.btnAvançar}
            disabled={advanced}
            onClick={handleNext}
            >
              Avançar
          </button>
        </div>
        <section>
          {itemAdd.length != 0 ? (
            itemAdd.map((item, index) => {
              return(
                <div key={index} className={styles.itemConfirmed}>
                  <span>{item[2]} - {item[0]}</span>
                  <button onClick={() => itemDelete(item[1])}><FiTrash2 size={25} color='#ff3f4b'/></button>
                </div>
              )
            })         
          ): null}
        </section>
      </main>
    </>
  )
}

export default id

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