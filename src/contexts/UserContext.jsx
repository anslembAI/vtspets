import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for active session in localStorage
        const savedUser = localStorage.getItem("vts_active_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (email, password) => {
        const users = authService.getAllUsers();
        // Simple password check (in real app, use hashing)
        const validUser = users.find(u => u.email === email && u.password === password);

        if (validUser) {
            setUser(validUser);
            localStorage.setItem("vts_active_user", JSON.stringify(validUser));
            return { success: true };
        } else {
            return { success: false, error: "Invalid email or password" };
        }
    };

    const register = (name, email, password) => {
        try {
            const newUser = authService.addUser(name, email, "user", password);
            setUser(newUser);
            localStorage.setItem("vts_active_user", JSON.stringify(newUser));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("vts_active_user");
        // Optionally redirect to home
        window.location.href = "/";
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};
