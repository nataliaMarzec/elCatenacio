import React, { Component,createContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink as Link } from "react-router-dom"
import VistaDeProductosParaClientes from './ComponentesPedidosCliente/Productos/VistaDeProductosParaClientes'
import WrapperConsumer ,{ContextUsuario} from './componentesSesion/Context/ContextUsuario'
import Responsables from './ComponentesPedidosCliente/Pedidos/Responsables/Responsables'
import socket from './Socket/Socket'
import Chat from './Socket/Chat'
// import NotFound from './'
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'))
const Login = React.lazy(() => import('./componentesSesion/LoginYSesionDeUsuarios/Login'))
const Register = React.lazy(() => import('./componentesSesion/LoginYSesionDeUsuarios/Register'))
const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))
const Home = React.lazy(() => import('./componentesSesion/LoginYSesionDeUsuarios/Home.js'))
const PrincipalPage = React.lazy(() => import('./PrincipalPage.js'))

class RoutesContainer extends Component {
    static contextType = createContext(ContextUsuario);
    
     setStateLogin(estado){
      this.setState({estadoLogin:estado})
     }

  render() {
    const { context: { usuario,auth,rol} } = this.props;
    console.log("ROUTESrender",rol)
    return (
      <div className="routes">
    
        <Switch>
          <Route exact path="/principalPage" name="PrincipalPage" render={props => <PrincipalPage {...props} />} />
          <Route exact path="/login" name="Login Page" render={props => <Login  {...props} />} />
          <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
          <Route path="/home" name="Home" render={props => <Home {...props} />} />
          {/* <Route path="/chat" name="Chat" nombre={rol} render={props=> <Chat nombre={rol} {...props}/>}/> */}
          {/* <Route component={NotFound}/> */}
          {auth === true && rol === "CLIENTE" ? (
            <Route exact path="/vistaDeProductosParaClientes" name="Productos-cliente" render={props => <VistaDeProductosParaClientes {...props} />} />
          ) : (
            ""
          )}
          {auth === true && rol === "ADMIN" || auth === true && rol === "RESPONSABLE" ? (
          <Route path="/" name="DefaultLayout" render={props => <DefaultLayout {...props} />} /> 

          ) : (
            ""
          )}
          <Route path="/responsables" name="Responsables" render={props=><Responsables {...props}/>}></Route>
        </Switch>
        <Switch>
          {auth === true && rol === "ADMIN" || auth === true && rol === "RESPONSABLE" ? (
            <Redirect exact to="/" />
          ) : (
            ""
          )}
          {/* <Route component={NotFound}/> cuando hacen path a una ruta que no existe*/}
          {auth === true && rol === "CLIENTE" ? (
            <Redirect to="/home" />
          ) : (
            ""
           
          )}
        </Switch>
      </div>
    )
  }
}

export default WrapperConsumer(RoutesContainer)
