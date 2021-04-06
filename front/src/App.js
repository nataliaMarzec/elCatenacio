import React, { Component } from 'react'
import './App.scss'
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink as Link} from "react-router-dom"
import {UsuarioProvider,useUsuario} from './componentes/Context/usuario-context'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'))
const Login = React.lazy(() => import('./componentes/LoginYSesionDeUsuarios/Login'))
const Register = React.lazy(() => import('./componentes/LoginYSesionDeUsuarios/Register'))
const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))
const Home = React.lazy(() => import('./componentes/LoginYSesionDeUsuarios/Home.js'))

// export default () =><UsuarioProvider>
//   <App></App>
// </UsuarioProvider>


function App() {
  // const {usuario,cargandoUsuario,login,signup,logout}=useUsuario()
  return (
    <div className="App">
    <Router>
 
      <main className="App-main">
      <React.Suspense fallback={loading()}>
      <Switch>
        <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
        <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
        <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
        <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
        <Route path="/" name="DefaultLayout" render={props => <DefaultLayout {...props}/>} />
        <Route exact path="/home" name="Home" render={props => <Home {...props}/>} />
        </Switch>
      </React.Suspense>
      <Switch>
        <Redirect to="/" />
      </Switch>
      </main>
      </Router>
    </div>
  );
}

export default App;
















