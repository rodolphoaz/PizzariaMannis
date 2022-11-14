import{useContext} from 'react'
import styles from '../../components/Header/styles.module.scss'
import{canSSRAuth} from '../../utils/canSSRAuth'
import Head from 'next/head'
import {Header}from '../../components/Header'
import { AuthContext } from '../../contexts/AuthContext'

export default function Dashboard(){

    const {user} = useContext(AuthContext)
    return(
        <>
        <Head>
            <title>Painel - Pizzaria Manny's</title>
        </Head>
        <div>
        <Header/>
        <h4 className={styles.headerBoasvindas}>Olá, {user?.name}</h4>
            <h1 className={styles.headerBoasvindas}>Painel</h1>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{

    return{
        props:{}
    }

})