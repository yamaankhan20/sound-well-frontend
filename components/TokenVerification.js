import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';

const TokenVerification = ({ children }) => {
    const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;

    const verifyToken = (token) => {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        } catch (error) {
            console.error("Token verification failed:", error);
            return null;
        }
    }

    const checkToken = () => {
        const token = localStorage.getItem('AuthToken');
        console.log("JWT Secret:", SECRET_KEY); // Log the secret to debug

        if (token) {
            const decodedToken = verifyToken(token);
            const currentTime = Date.now() / 1000;

            if (!decodedToken || decodedToken.exp < currentTime) {
                // localStorage.removeItem('AuthToken'); // Remove expired token
                // Router.replace('/auth/login'); // Redirect to login
            }
        } else {
            // Router.replace('/auth/login'); // Redirect to login if no token
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return <>{children}</>;
};

export default TokenVerification;
