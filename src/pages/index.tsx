import Head from "next/head";
import Logo from "../../public/logo.svg";
import Image from "next/image";
import styles from "../../styles/home.module.scss";
import { useContext, FormEvent, useState } from "react";
import {Input} from "@/Components/Input";
import { Button } from "@/Components/Button";
import Link from "next/link";
import { AuthContext } from "@/Contexts/AuthContext";
import { canSSRGuest } from "@/Utils/CanSSRGuest";


export default function Home() {
  const {signIn} = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handlelogin(event:FormEvent) {
    event.preventDefault();
    if (email === '' || password === ''){
      alert('preencha os dados')
      return
    }
      setLoading(true);
      await signIn({
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
        <form onSubmit={handlelogin}>
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
            Acessar
          </Button>
        </form>
        <Link
          href='/signup'
          className={styles.link}>
          Não possui uma conta? Cadastre-se
        </Link>
      </div>
     </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
   return {
    props:{}
  } 
})