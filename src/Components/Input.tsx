import React, {InputHTMLAttributes, TextareaHTMLAttributes} from 'react'
import styles from "./Input.module.scss"

interface inputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface textareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input ({...rest}: inputProps) {
  return (
    <input 
      className={styles.input}
      {...rest}
    />
  )
}

export function TextArea({...rest}: textareaProps){
  return (
    <textarea className={styles.input} {...rest}></textarea>      
  )
}
