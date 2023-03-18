import Head from "next/head";
import Logo from "../../public/logo.svg";
import Image from "next/image";
import styles from "../../styles/home.module.scss";
import { useContext, FormEvent, useState } from "react";
import {Input} from "@/Components/Input";
import { Button } from "@/Components/Button";
import Link from "next/link";
import { AuthContext } from "@/Contexts/AuthContext";

export default function Singup() {
  const {signUp} = useContext(AuthContext);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handlelogin(event:FormEvent) {
    event.preventDefault();
    if (name === '' || email === '' || password === ''){
      alert('preencha os dados')
      return
    }
    setLoading(true);
    
    await signUp({
      name: name,
      email: email,
      password: password
    })
    
    setLoading(false)
    
  }
  return (
    <>
     <Head>
       <title>Sujeito Pizza</title>
     </Head>
     <div className={styles.container}>
      <Image src={Logo} alt='logo'/>
      <div className={styles.login}>
        <h1>Criando a sua conta</h1>
        <form onSubmit={handlelogin}>
          <Input 
            type='text'
            placeholder='Digite seu nome'
            value={name}
            onChange={({target}) => setName(target.value)}
          />
          <Input 
            type='text'
            placeholder='Digite seu email'
            value={email}
            onChange={({target}) => setEmail(target.value)}
          />
          <Input
            type='password'
            placeholder="******"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
          <Button 
            type='submit'
            Loading={loading}
          >
            Cadastrar
          </Button>
        </form>
        <Link
          href='/'
          className={styles.link}>
            Já possui conta? Faça o login.
        </Link>
      </div>
     </div>
    </>
  )
}

