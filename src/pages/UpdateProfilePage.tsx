import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../api/userApi";
import type { UserProfile } from "../types/types";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";

const EditProfilePage = () => {
    
    const { user } = useAuth();

    const [profile, setProfile] = useState<UserProfile | null> (null);
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
            setProfile(data);
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

                navigate ('/profile');
                
            } catch (error: any) {
                setError(error.message)
            }



        };

    return (
        
        <div>

            <NavBar />

            <form onSubmit={handleUpdateProfile}>
                <input
                type='text'
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder='Name'
                />
                <input
                type='email'
                disabled={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                />
                <input
                type='text'
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder='Date of Birth'
                />
                <input
                type='text'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder='Street'
                />
                <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='City'
                />
                <input
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder='State'
                />
                <input
                type='text'
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder='Zip Code'
                />
                <button type='submit'>Update Profile</button>
            </form>
        </div>
    )

}

export default EditProfilePage;
