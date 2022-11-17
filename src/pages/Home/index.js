import './home.css';


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { auth }  from '../../Services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputSenha, setInputSenha] = useState('');
    const navigate = useNavigate();

    async function logarApp(e) {
        e.preventDefault();

        if(inputEmail === '' || inputSenha === '') {

            toast.warn('Preencha todos os Campos', {
                theme:'dark',
                position: 'bottom-center'
            })

            return;
        }

        await signInWithEmailAndPassword(auth, inputEmail, inputSenha)
        .then(() => {
            navigate('/admin', { replace: true });

            toast.success('Bem Vindo de Volta', {
                theme: 'dark',
                position: 'top-center'
            })
        })
        .catch(() => {
            toast.error(`Ops Algo deu Errado`, {
                theme: 'dark',
                position: 'top-center'
            })
        })
        
        
    }



    return(
        <div className='homeContainer'>
            <h1>Lista de Tarefas App</h1>
            <p>Gerencie suas Tarefas de Forma Simples.</p>

            <form className='form' onSubmit={logarApp}>

                <label className='title'>E-mail</label>
                <input 
                    type="email" 
                    placeholder='Digite seu E-mail'
                    value={inputEmail}
                    onChange={ (e) => setInputEmail(e.target.value) }
                />

                <label className='title'>Senha</label>
                <input 
                    type="password" 
                    placeholder='*******'
                    value={inputSenha}
                    onChange={ (e) => setInputSenha(e.target.value) }
                />

                <button className='btnAcessar' type='submit'>
                    Acessar
                </button>

            </form>

            <Link className='linkCadastro' to='/cadastro'>
                Não Possui uma Conta? Cadastre-se!
            </Link>
        </div>
    );
}