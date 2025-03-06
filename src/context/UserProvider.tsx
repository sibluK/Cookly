import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserContextType } from '../types/types';

type UserProviderProps = {
    children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const id = localStorage.getItem('id');
        const username = localStorage.getItem('username');

        if (id && username) {
            setUser({ id: id, username: username });
        }
    }, [])

    const logout = () => {
        setUser(null);
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        console.log('logged out')
    }

    const isAuthenticated = user !== null;

    return (
        <UserContext.Provider value={{ user, setUser, logout, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return context;
}