import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from '../lib/firebaseConfig';

interface AuthContextType { 
    user: null | User,
    setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: (user: User) => {}
})

export const AuthProvider = ({children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); //this is a hook so we can simply import useAuth and get access to the context