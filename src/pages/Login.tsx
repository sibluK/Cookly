import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserProvider';
import { useNavigate } from 'react-router';
import '../styles/login-register.css';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { setUser, isAuthenticated } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/dashboard');
        }
    }, [])

    return (
        <div className='login-register-wrapper'>
            <h2>Login</h2>
            <form onSubmit={HandleLogin}>
                <label htmlFor='username'>Username:</label>
                <input className={error ? "error": ""} onChange={HandleUsernameInput} value={username} name='username' type='text'></input>

                <label htmlFor='password'>Password:</label>
                <input className={error ? "error": ""} onChange={HandlePasswordInput} value={password} name='password' type='password'></input>

                {error && <p className='error-message'>{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    )

    function HandleUsernameInput(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function HandlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function HandleLogin(e: React.FormEvent) {
        e.preventDefault();

        if(username === '' || password === '') {
            setError('username or password is empty');
            return;
        }
        
        axios.get(`http://localhost:3000/users?username=${username}&password=${password}`)
        .then(response => {
            if(response.data.length === 0) {
                setError('Wrong credentials');
                return;
            }
            const user = response.data[0];
            localStorage.setItem('id', user.id);
            localStorage.setItem('username', user.username);
            setUser(user);
            setError('');
            navigate('/dashboard');
        })
        .catch(error => {
            setError('An error occurred during login');
            console.log(error);
        });

    }

}