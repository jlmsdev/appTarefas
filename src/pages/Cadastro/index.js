import './cadastro.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Cadastro() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputSenha, setInputSenha] = useState('');

    function cadastrar(e) {
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
            <h1>Crie Sua Conta</h1>
            <p>Comece Agora a Gerenciar suas Tarefas</p>

            <form className='form' onSubmit={cadastrar}>

                <label className='title'>E-mail</label>
                <input 
                    type="email" 
                    placeholder='Digite seu E-mail'
                    value={inputEmail}
                    onChange={ (e) => setInputEmail(e.target.value) }
                />

                <label className='title'>Crie uma Senha</label>
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

            <Link className='linkCadastro' to='/'>
                Já Possui uma Conta ? Faça seu Login
            </Link>
        </div>
    );
}