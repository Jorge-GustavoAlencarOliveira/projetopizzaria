import React from 'react'
import styles from './Modal.module.scss'
import { FaWindowClose } from 'react-icons/fa'

const Modal = ({detail, modal, setModal, soma, finish}) => {
  function handleClose (){
    setModal(!modal)
  }
  if(modal)
  return (
    <div className={styles.containerModal}>
      <div className={styles.modal}>
        <button onClick={handleClose}>
          <FaWindowClose size={50} color='#ff3f4b'/>
        </button>
        <h1>Detalhes dos pedidos</h1>
        <span>Mesa: <strong>{detail[0].order.table}</strong></span>
        <div >
          {detail.map( item=> {
            return(
              <div key={item.id} className={styles.orders}>
                <span><strong>{item.amount} {item.product.name}</strong> </span>
              </div>
            )
          })}
        </div>
        <div className={styles.total}>
          <h3>Total:</h3>
          <span>R$ {soma},00</span>
        </div>
        <button onClick={() => finish(detail[0].order_id)} className={styles.bntConcluir}>Concluir pedido</button>
      </div>
    </div>
  )
}


export default Modal
