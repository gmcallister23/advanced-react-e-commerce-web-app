import { useState, FormEvent} from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';

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
        <div className='pt-5 vh-100 bg-warning-subtle'>
            <Container>
                <h2>Login</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <button className='btn btn-success' type='submit'>Login</button>
                {error && <p>{error}</p>}
            </Form>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </Container>
        </div>
    )
}

export default Login;