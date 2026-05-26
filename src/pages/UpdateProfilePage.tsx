import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../api/userApi";
//import type { UserProfile } from "../types/types";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";
import {Container, Form} from 'react-bootstrap';

const EditProfilePage = () => {
    
    const { user } = useAuth();

    //const [profile, setProfile] = useState<UserProfile | null> (null);
    const [displayName, setDisplayName] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    
    useEffect(() => {

        if (!user?.uid) return;

        if (user?.displayName) {
            setDisplayName(user.displayName)
        }
        if (user?.email) {
            setEmail(user.email)
        }
        
        const fetchProfile = async () => {

            const data = await getUserProfile(user.uid);

            if (!data) {
                setLoading(false);
                return;
            }
            //setProfile(data);
            setLoading(false);

            setDateOfBirth(data.dateOfBirth ?? '');
            setStreet(data.address?.street ?? '');
            setCity(data.address?.city ?? '');
            setState(data.address?.state ?? '');
            setZipCode(data.address?.zipCode ?? '');

        }

        fetchProfile();
        
    }, [user?.uid]);

    //if (!profile) return <p>Loading...</p>
    if (loading) return <p>Loading...</p>

    


    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setError('');
            setSuccess('');
            if(!user) {
                setError('User not found');
                return;
            }
            try {
                await updateProfile(user, {
                    displayName: displayName,
                });
                await updateUserProfile(user.uid, {
                    dateOfBirth,
                    address: {
                        street,
                        city, 
                        state,
                        zipCode
                    }
                });
                setSuccess('Profile updated successfully');

                setTimeout(() => {
                    navigate ('/profile');
                }, 800);

            } catch (error: any) {
                setError(error.message)
            }



        };

    return (
        
        <div className='bg-warning-subtle vh-100 pt-5'>
            <nav>
            <NavBar />
            </nav>

            <Container>
                <h2 className='text-center pt-3'>Update Profile</h2>

                {error && (
                    <div className='alert alert-danger mt-3'>
                        {error}
                    </div>
                )}

                {success && (
                    <div className='alert alert-success mt-3'>
                        {success}
                    </div>
                )}

            <Form onSubmit={handleUpdateProfile}>
                <Form.Group>
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                type='text'
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder='Name'
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type='email'
                disabled={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                type='text'
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder='Date of Birth'
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Street</Form.Label>
                <Form.Control
                type='text'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder='Street'
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='City'
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder='State'
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                type='text'
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder='Zip Code'
                />
                </Form.Group>
                <button className='btn btn-success' type='submit'>Update Profile</button>
            </Form>

            </Container>
        </div>
    )

}

export default EditProfilePage;
