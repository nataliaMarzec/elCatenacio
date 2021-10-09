import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink as Link } from "react-router-dom"
import RoutesContainer from './RoutesContainer'
import WrapperConsumer, {ContextUsuario}  from './componentesSesion/Context/ContextUsuario'
import socket from './Socket/Socket'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

class App extends React.Component {
  

  render() {
    //  socket.emit('conectado',"hola soy el cliente+++++++++++")
    return (
      <div className="App" style={{ backgroundColor: "#FDFFFE" }}>
       <ContextUsuario>
        <Router>
          <main className="App-main">
            <React.Suspense fallback={loading()}>
            <RoutesContainer/>
           
            </React.Suspense>
            <Switch>
              <Redirect to="/principalPage" />
              {/* <Redirect to="/login" /> */}
            </Switch>
          </main>
        </Router>
        </ContextUsuario>
      </div>

    );
  }
}
export default App;


