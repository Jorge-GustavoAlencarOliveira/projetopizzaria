import {createContext, ReactNode, useState, useEffect} from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import  Router  from 'next/router';
import { api } from '@/Services/apiClient';
import {toast} from 'react-toastify'

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (Credentials: SignInProps) => Promise<void>
  signOut: () => void;
  signUp: (Credential: SignUpProps) => Promise<void>
}

type UserProps = {
  id: string,
  name: string,
  email: string
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps ={
  children: ReactNode;
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token');
    toast.info('Você saiu da conta')
    Router.push('/')
  }catch{
    console.log('Erro ao deslogar')
  }
}

export function AuthProvider ({children}: AuthProviderProps){
  
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;
  
  useEffect(() =>{
    const {'@nextauth.token': token} = parseCookies();
    if(token){
      api.get('/me').then(response =>{
        const {id, name, email} = response.data;
        setUser({
          id,
          name,
          email
        })
      })
      .catch(err =>{
        signOut();
      })
    }
  },[])

  async function signIn({email, password}: SignInProps){
    try{
      const response = await api.post('/session', {
        email,
        password
      })
      // console.log(response.data)
      const {id, name, token} = response.data
      setCookie(undefined, '@nextauth.token', token,{
        maxAge: 60*60*24*30,
        path: "/"
      })
      setUser({
        id,
        name,
        email
      })
      //passar para as proximas requisições o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`
      toast.success('Logado com sucesso!')
      //Redirecionar para dashboard
      Router.push('/dashboard')

    } catch(err){
      toast.error("Usuário ou senha inválidos!")
    }
  }
  async function signUp({name, email, password}: SignUpProps){
    try{
      await api.post('/users', {
        name,
        email,
        password,
      })
      toast.success('Cadastrado com sucesso');
      Router.push('/')
    }catch(err){
      toast.error('Erro ao cadastrar')
      console.log('Erro ao cadastrar')
    }
  }


  return(
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp} }>
      {children}
    </AuthContext.Provider>
  )
}