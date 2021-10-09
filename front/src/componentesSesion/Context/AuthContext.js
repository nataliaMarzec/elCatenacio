import React, { createContext, useContext, useState, useEffect } from "react";
// import api from "../services/api";
var api= "http://localhost:8383"
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    const storagedUser = localStorage.getItem("@App:usuario");
    const storagedToken = localStorage.getItem("@App:token");

    if (storagedUser && storagedToken) {
      setUsuario(JSON.parse(storagedUser));
    //   api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  function logout() {
    setUsuario(null);

    localStorage.removeItem("@App:usuario");
    localStorage.removeItem("@App:token");
  }

  async function login(email, password) {
    const response = await api.post("/sessions", {
      email: email,
      password: password,
    });

    setUsuario(response.data.usuario);
    // api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    localStorage.setItem("@App:usuario", JSON.stringify(response.data.usuario));
    localStorage.setItem("@App:token", response.data.token);
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(usuario), usuario, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
