
import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../lib/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('Logged Out');
            navigate ('/');
        } catch (err: any) {
            console.log('Logout Error:', err.message);
        }
    }

    return (
        <div>
            <h2>Are you sure you want to log out of your session?</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;