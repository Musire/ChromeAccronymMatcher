import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from '.';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('No context in the useAuth hook');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { addSuccess } = useToastContext()

    const initializeAuth = useCallback(() => {
        const foundToken = sessionStorage.getItem('accessToken');
        if (!foundToken) {
            setToken(null);
            setUser(null);
            setIsLoading(false);
            return;
        }

        login(foundToken)
        
    }, []);

    const login = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decoded.exp && decoded.exp < currentTime) {
                console.warn(decoded.exp, currentTime)
                console.warn('Token has expired');
                sessionStorage.removeItem('accessToken');
                setToken(null);
                setUser(null);
            } else {
                sessionStorage.setItem('accessToken', token)
                setToken(token);
                setUser(decoded);
            }
            addSuccess('successfully logged in')
        } catch (error) {
            console.error('Failed to decode token:', error);
            sessionStorage.removeItem('accessToken');
            setToken(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    const logoutRequest = async (userId) => {
    try {
        const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/logout`,
        { userId }, // body
        { withCredentials: true } // if you use cookies
        );

        console.log(response.data.message);
        // Clear local storage or auth state if needed
        localStorage.removeItem('token'); // if using JWT
        // Redirect to login or home page
        window.location.href = '/login';
    } catch (err) {
        console.error('Logout failed:', err.response?.data?.message || err.message);
    }
    };

    const logout = (forced=false) => {
        if (!forced) logoutRequest(user.id);
        sessionStorage.removeItem('accessToken');
        setToken(null);
        setUser(null);
        addSuccess('successfully logged out')
        navigate('/login', { replace: true });
    };

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const authContext = {
        user, 
        token, 
        isLoading, 
        initializeAuth, 
        login, 
        logout, 
    }

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};

