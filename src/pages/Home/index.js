import './home.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputSenha, setInputSenha] = useState('');

    function logarApp(e) {
        e.preventDefault();

        if(inputEmail === '' || inputSenha === '') {

            toast.warn('Preencha todos os Campos', {
                theme:'dark',
                position: 'bottom-center'
            })
        }

        
        
        
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