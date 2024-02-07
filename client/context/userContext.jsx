import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const userContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('https://melody-stream-server.vercel.app/profile')
                .then(({ data }) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message || 'Error fetching user data');
                    setLoading(false);
                });
        }
    }, [user]);

    return (
        <userContext.Provider value={{ user, setUser, loading, error }}>
            {children}
        </userContext.Provider>
    );
}
