import { useState, FormEvent} from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try { 
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful");
            navigate('/profile');
        } catch (error: any) {
            setError(error.message)
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Logged Out")
        } catch (err: any) {
            console.log("Logout error:", err.message)
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <input
                type='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
                {error && <p>{error}</p>}
            </form>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Login;