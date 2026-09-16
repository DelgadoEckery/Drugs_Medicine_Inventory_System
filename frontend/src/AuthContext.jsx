import { createContext, useContext, useState } from "react";
import api from "./services/api";
const C = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("inventory_token"));
    const login = async (c) => {
        const { data } = await api.post("/login", c);
        localStorage.setItem("inventory_token", data.token);
        setToken(data.token);
    };
    const logout = async () => {
        try {
            await api.post("/logout");
        } finally {
            localStorage.removeItem("inventory_token");
            setToken(null);
        }
    };
    return <C.Provider value={{ token, login, logout }}>{children}</C.Provider>;
};
export const useAuth = () => useContext(C);
