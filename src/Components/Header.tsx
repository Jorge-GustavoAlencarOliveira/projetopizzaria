import Link from 'next/link'
import React from 'react'
import styles from './Header.module.scss'
import Logo from '../../public/logo.svg'
import Image from 'next/image'
import {FiLogOut} from 'react-icons/fi'
import { AuthContext } from '@/Contexts/AuthContext'
import {useRouter} from 'next/router'

const Header = () => {
  const {pathname} = useRouter();
  const {signOut} = React.useContext(AuthContext) 
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href='/dashboard'>
          <Image src={Logo} alt='Logo' width={190} height={60}/>
        </Link>
        <nav>
          <Link 
            href='/order'
            className={pathname.startsWith('/order') ? 'active' :
            ''}>Pedido
          </Link>
          <Link 
            href='/category' 
            className={pathname.startsWith('/category') ? 'active' : 
            ''} >Categoria</Link>
          <Link 
            href='/product'
            className={pathname.startsWith('/product') ? 'active' :
             ''}>Produto</Link>
         
          <button onClick={signOut}>
            <FiLogOut size={23} color='#fff'/>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
