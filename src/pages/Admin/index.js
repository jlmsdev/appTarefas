import './admin.css';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { banco } from '../../Services/firebaseConnection';
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc
} from 'firebase/firestore';


export default function Admin() {
    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);

    

    useEffect(() => {

        async function loadTarefas() {
            const userDetail = localStorage.getItem('appTarefas');
            setUser(JSON.parse(userDetail));

            if(userDetail) {
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(banco, 'tarefas');
                const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid))

                onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            dataTarefa: doc.data().dataTarefa,
                            userUid: doc.data().userUid
                        })
                    })

                    setTarefas(lista);
                })
            }


        }

        loadTarefas();

    }, [])

    async function cadastraTarefa(e) {
        e.preventDefault();

        if(tarefaInput === '') {
            toast.warn('Digite uma Tarefa', {
                theme: 'dark',
                position: 'top-center'
            })
            return;
        }

        await addDoc(collection(banco, 'tarefas'), {
            tarefa: tarefaInput,
            created: new Date(),
            dataTarefa: new Date().toLocaleString(),
            userUid: user?.uid
        })
        .then(() => {
            toast.success('Tarefa Registrada', {
                theme: 'dark',
                position: 'top-center'
            })
            setTarefaInput('');
        })
        .catch((error) => {
            toast.error('Erro ao Cadastrar', {
                theme: 'dark',
                position: 'top-center'
            })
            console.log(error)
        })

    }

    async function deleteTarefa(id) {
        const tarefaRef = doc(banco, 'tarefas', id);
        
        await deleteDoc(tarefaRef)
        .then(() => {
            toast.success('Tarefa Concluida', {
                theme: 'dark',
                position: 'top-center'
            })
        })
        .catch((error) => {
            toast.error('Algo deu Errado', {
                theme: 'dark',
                position: 'top-center'
            })
            console.log(error);
        })

    }


    return(
        <div className='adminContainer'>
            <Header />
            <h1>Minhas Tarefas</h1>

            <form className='form' onSubmit={cadastraTarefa}>
                <textarea
                    placeholder='Digite sua Tarefa'
                    value={tarefaInput}
                    onChange={ (e)=> setTarefaInput(e.target.value) }
                />

                <button className='btnCadastra' type='submit'>
                    Cadastrar Tarefa
                </button>
            </form>

            {tarefas.map((item) => (

                <article key={item.id} className='containerTarefa'>
                    <p className='textTarefa'>{item.tarefa}</p>
                    <time className='dtaHora'> <BiTimeFive size={25} /> {item.dataTarefa}</time>
                    <span className='userInsert'> <AiOutlineUserAdd size={25}/> {user.email}</span>

                    <div className='areaButtons'>
                        <button className='btnEdit'>Editar</button>
                        <button className='btnDelete' onClick={() => deleteTarefa(item.id) }>Concluir</button>
                    </div>
                </article>

            ))}

        </div>
    );
}