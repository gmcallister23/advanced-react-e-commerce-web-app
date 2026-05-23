import { useState, FormEvent } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { createUserProfile } from '../api/userApi';
import { Container, Form } from 'react-bootstrap';

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            alert('Registration Successful');

            const user = userCredential.user;

            await updateProfile(userCredential.user, {
                displayName: displayName,
            });

            await createUserProfile(user);

            navigate('/profile');
        } catch (err: any) {
            setError(err.message)
        }
    };

    return (
        <div className='pt-5 bg-warning-subtle vh-100'>
            <Container>
            <h2>Register</h2>
            <Form onSubmit={handleRegister}>
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
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='text'
            placeholder='Name'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
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
            <button type='submit'>Register</button>
            {error && <p>{error}</p>}

            </Form>
            </Container>
        </div>
       
    )

}

export default Register;