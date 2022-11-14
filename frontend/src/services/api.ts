import axios, { AxiosErros } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'
import { signOut } from '../contexts/AuthContext'


export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx);
    const api = axios.create({
        baseURL:'http://localhost:3333',
        Headers:{
            Authorization:`Bearer ${cookies['@pizzarianapolis.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;

    },
        (error: AxiosErros) => {
        if(error.response.status === 403){
            //regra: erro 401 deslogar usuário
            if(typeof window !== undefined){
                //chama a função para deslogar o usuário
                signOut();
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    
    })

    return api;
}
