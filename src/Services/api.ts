import axios, {AxiosError} from 'axios';
import {parseCookies} from 'nookies';
import { AuthTokenError } from './Errors/AuthTokenErros';
import { signOut } from '@/Contexts/AuthContext';
export function setupAPICliente(ctx = undefined){
  let cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: 'https://pizzariabackend.vercel.app',
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`
    }
  })
  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) =>{
    if(error.response.status === 401){
      // qualquer erro 401 devemos deslogar o usuario
      if(typeof window !== undefined){
        //Chamar função de deslogar usuario
        signOut();
      }
    } else{
      return Promise.reject(new AuthTokenError())
    }
    
    return Promise.reject(error)

  })
  return api;
}