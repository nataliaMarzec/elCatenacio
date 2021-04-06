import React, { useState, useEffect, useMemo } from "react";

const UsuarioContext = React.createContext();

export function UsuarioProvider(props) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  useEffect(() => {
    async function cargandoUsuario() {
      if (!getToken) {
        setCargandoUsuario(false);
        return;
      }
      try {
        const { data: usuario } = await fetch(
          `http://localhost:8282/`
        );
        setUsuario(usuario);
        setCargandoUsuario(false);
      } catch (error) {
        console.log(error);
      }
    }
    cargarUsuario();
  },[]);


async function login(email, password) {
  const data = await fetch(`http://localhost:8282/usuarios/login`, {
    email,
    password,
  });
  setUsuario(data.usuario);
  // setToken(data.token);
}

async function signup(usario) {
  const { data } = await fetch(`http://localhost:8282/usuarios/signup`, {
    usuario,
  });
  setUsuario(data.usuario);
  // setToken(data.token);
}

function logout() {
  setUsuario(null);
  // deleteToken();
}

function setToken(){

}
function deleteToken(){

}

const value = useMemo(() => {
  return {
    usuario,
    cargandoUsuario,
    signup,
    login,
    logout,
  };
}, [usuario, cargandoUsuario]);
return <UsuarioContext.Provider value={value} {...props} />;

function useUsuario(){
    const context=React.useContext(UsuarioContext)
    if(!context){
        throw new Error("use usuario debe estar dentro del provedor UsuarioContext")
    }
    return context;
}

}

function cargarUsuario(){

}
function getToken() {
  return 1;
}

