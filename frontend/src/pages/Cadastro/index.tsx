import { FormEvent, useState, useContext } from 'react';
import Head from 'next/head'
import Image from 'next/image';

import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/Input'

import {Button} from '../../components/ui/Button'
import {AuthContext}from'../../contexts/AuthContext'
import { toast } from 'react-toastify'

import Link from 'next/link';



export default function Cadastro() {
  const{ signUp } = useContext(AuthContext);

  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const [loading , setLoading] = useState(false);


  async function handleSignUp(event:FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.error("Preencha todos os campos!")
      return;

    }

    setLoading(true);

    let data={
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false);
    
  } 

  return(
    <>
    <Head>
    <title> Pizzaria Napolis - Faça seu cadastro </title>
    </Head>

    <div className = {styles.containerCenter}>
      <Image src = {logoImg} alt ="logo napolis" />
         
         <div className = {styles.login}>
            <h2>Criando sua conta</h2>

    <form onSubmit={handleSignUp}>
    <Input 
           placeholder="Digite seu Nome"
           type="text"
           value={name}
           onChange= { (e) =>setName(e.target.value)}
      />

      <Input 
           placeholder="Digite seu E-mail"
           type="text"
           value={email}
           onChange= { (e) =>setEmail(e.target.value)}
      />

    <Input 
           placeholder="Cadastre sua Senha"
           type="password"
           value={password}
           onChange= { (e) =>setPassword(e.target.value)}
      />

      <Button
      type="submit"
      Loading={loading}
      >
        Cadastrar
        </Button>
      </form>
      <Link href="/">
          <a className={styles.text}>possui uma conta? Faça seu Login!</a>
      </Link>
      
      </div>
    </div>
  </>
  )
}
