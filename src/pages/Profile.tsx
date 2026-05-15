import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, deleteUser } from 'firebase/auth';

import NavBar from "../components/Navbar/NavBar";

const Profile: React.FC = () => {

    const {user} = useAuth()
    const [displayName, setDisplayName] = useState(user?.displayName|| '');
    const [email, setEmail] = useState(user?.email || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            setSuccess('Profile updated successfully');
        } catch (error: any) {
            setError(error.message)
        }
    };

    const handleDeleteAccount = async () => {
        try {
            if (!user) {
                setError('User not found');
                return;
            }
            await deleteUser(user);
            setSuccess('Account deleted successfully');
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div className="pt-5">
            <nav>
              <NavBar />  
            </nav>
            <h1>Profile</h1>
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
                <button type='submit'>Update Profile</button>
                <div>
                    <button onClick={handleDeleteAccount}>Delete Account</button>
                </div>

            </form>
        </div>
    );

};
export default Profile;