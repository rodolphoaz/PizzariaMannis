import { useState, FormEvent } from 'react'
import Head from "next/head"
import {Header} from '../../components/Header'
import styles from './styles.module.scss'

import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'

import { canSSRAuth } from '../../utils/canSSRAuth'
import axios from '../../../node_modules/axios/index'

export default function Category(){
  const [name, setName] = useState('')

  function handleRegister(event: FormEvent){
    event.preventDefault();

    if(name === ''){
      return;
    }

    const postData = {
      'name': name
    }
    const axiosConfig = {
      headers: {
          "Content-Type"                : 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin" : '*',
          "Authorization"               : 'Bearer @pizzarianapolis.token'
      }
    };

    axios.post('http://localhost:3333/category',postData,axiosConfig).then(response => {
      console.log(response.data);
    })



    //const apiClient = setupAPIClient();
    //await apiClient.post('/category', {
     // name: name
    //})

   toast.success('Categoria cadastrada com sucesso!')
    setName('');

  }


  return(
    <>
    <Head>
      <title>Cadastro de novas categorias</title>
    </Head>
    <div>
      <Header/>

      <main className={styles.container}>
        <h1>Cadastrar categorias</h1>

        <form className={styles.form} onSubmit={handleRegister}>
          <input 
          type="text" 
          placeholder="Digite o nome da categoria"
          className={styles.input}
          value={name}
          onChange={ (e) => setName(e.target.value) }
          />

          <button className={styles.buttonAdd} type="submit">
            Cadastrar
          </button>

        </form>

      </main>
    </div>
    </>
  )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }

})