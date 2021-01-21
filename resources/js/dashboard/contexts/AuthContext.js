import React, { createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children, auth }) => {
    return (
        <AuthContext.Provider value={{ user: auth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
