import './header.css';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../Services/firebaseConnection'
import { toast } from 'react-toastify';
import { SlLogout } from 'react-icons/sl';

export default function Header() {

    const [user, setUser] = useState({});

    useEffect(() => {

        const getUser = localStorage.getItem('appTarefas');
        setUser(JSON.parse(getUser))
    }, [])


    async function deslogarApp() {
        
        await signOut(auth)
        .then(() => {
            toast.success('Você Saiu!', {
                theme: 'dark',
                position: 'top-center'
            })
        })
        .catch(() => {
            toast.error('Ops Algo deu Errado', {
                theme: 'dark',
                position: 'top-center'
            })
        })
    }

    return(
        <header className='containerHeader'>
            <nav className='menu'>
                <span className='userLogado'>{user.email}</span>
                <button onClick={deslogarApp} className='btnDeslogar'>
                    <SlLogout size={25} />
                </button>
            </nav>
        </header>
    );
}