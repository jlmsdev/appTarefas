import { auth } from '../Services/firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { toast } from 'react-toastify';



export default function Private( { children } ) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem('appTarefas', JSON.stringify(userData));
                    setLoading(false);
                    setSigned(true);

                }else {
                    setLoading(false);
                    setSigned(false);
                }
            })
        }
        checkLogin();
    }, [])

    if(loading) {
        return(
            <div></div>
        )
    }

    if(!signed) {
        toast.info('Faça Login Para Acessar', {
            theme:'dark',
            position: 'top-center'
        })
        
        return <Navigate to='/' />
    }
    

    return children;
}