import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// Paginas que so podem ser visitadas por usuários deslogados

export function canSSRGuest<P>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
    const cookie = parseCookies(ctx)
    // se o usuario ja tiver logado, redireciona  
    if(cookie['@nextauth.token']){
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }
    return await fn(ctx);
  }
}