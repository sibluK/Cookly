import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/login-register.css';
import { useUser } from '../context/UserProvider';

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { isAuthenticated } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/dashboard');
        }
    }, [])

    return (
        <div className='login-register-wrapper'>
            <h2>Register</h2>
            <form onSubmit={HandleRegister}>
                <label htmlFor='username'>Username:</label>
                <input className={error ? "error": ""} onChange={HandleUsernameInput} name='username' type='text'></input>

                <label htmlFor='password'>Password:</label>
                <input className={error ? "error": ""} onChange={HandlePasswordInput} name='password' type='password'></input>

                <label htmlFor='confirm-password'>Confirm Password:</label>
                <input className={error ? "error": ""} onChange={HandleConfirmPasswordInput} name='confirm-password' type='password'></input>

                {error && <p className='error-message'>{error}</p>}

                <button type="submit">Register</button>
            </form>
        </div>

    )

    function HandleUsernameInput(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function HandlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function HandleConfirmPasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.target.value);
    }

    function HandleRegister(e: React.FormEvent) {
        e.preventDefault();

        if(username === '' || password === '' || confirmPassword === '') {
            setError('Please input the fields');
            return;
        }

        if(password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        axios.post(`http://localhost:3000/users`, {username, password})
            .then(response => {
                if(response.status === 201) { 
                    navigate('/login');
                    setError('');
                }
            })

    }

}