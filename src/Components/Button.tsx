import React, {ButtonHTMLAttributes, ReactNode} from 'react'
import styles from './Button.module.scss'
import {FaSpinner} from "react-icons/fa"


interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  Loading?: boolean;
  children: ReactNode;
}

export const Button = ({Loading, children, ...rest}: buttonProps) => {
  return (
    <button className={styles.button}
     disabled={Loading}
     {...rest}
    > 
      {Loading ? <FaSpinner color='#fff' size={16}/> :
       <a className={styles.textButton}>{children}</a> 
      }  
    </button>
  )
}
