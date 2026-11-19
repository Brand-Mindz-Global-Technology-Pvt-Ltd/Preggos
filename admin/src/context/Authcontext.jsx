
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

import {
    loginUser,
    registerUser,
    logoutUser,
    forgotPasswordRequest,
    resetPasswordRequest,
} from "../api/auth.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    /* ---------- Load admin from storage ---------- */
    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            setUser(JSON.parse(storedAdmin));
        }
    }, []);

    /* ---------- LOGIN ---------- */
    const login = useCallback(async (values) => {
        const data = await loginUser(values);
        const adminData = {
            id: data.admin.id,
            username: data.admin.username,
        };
        localStorage.setItem("admin", JSON.stringify(adminData));
        localStorage.setItem("token", data.token);
        setUser(data.admin);
        return data;
    }, []);

    /* ---------- REGISTER ---------- */
    const register = useCallback(async (values) => {
        return await registerUser(values);
    }, []);

    /* ---------- LOGOUT ---------- */
    const logout = useCallback(() => {
        logoutUser();
        setUser(null);

        localStorage.removeItem("admin");
        localStorage.removeItem("token");
    }, []);

    /* ---------- FORGOT PASSWORD ---------- */
    const forgotPassword = useCallback(async (email) => {
        return await forgotPasswordRequest(email);
    }, []);

    /* ---------- RESET PASSWORD ---------- */
    const resetPassword = useCallback(async (token, password) => {
        return await resetPasswordRequest(token, password);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,             
                isAuthenticated: !!user,
                login,
                register,
                logout,
                forgotPassword,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
