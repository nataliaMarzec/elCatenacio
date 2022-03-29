import React, { Component, Suspense ,createContext} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
import navigation from '../../_nav';
import navigationResponsable from '../../_navResponsable'
import routes from '../../routes';
import PrivateRoutes from '../../PrivateRoutes';
import WrapperConsumer,{ContextUsuario} from '../../componentesSesion/Context/ContextUsuario';
const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  static contextType = createContext(ContextUsuario);

  // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  onLogout(e) {
    e.preventDefault()
    this.props.context.estadoInicial()
    this.props.history.push('/password')
  }

  render() {
    const { context: { usuario,auth,rol } } = this.props;
    const filterResponsable= routes.filter(r=>r.permisoResponsable == true && rol !== "ADMIN")
    const filterAdmin= routes.filter(r=>r.permisoAdmin == true && rol == "ADMIN")
    return (
      <div className="app"  >
        <AppHeader style={{ backgroundColor: "#041024" }} fixed>
            <DefaultHeader  onLogout={e=>this.onLogout(e)}/>
        </AppHeader>
        <div className="app-body" >
          <AppSidebar style={{ backgroundColor: "#071835" }} fixed display="lg">
            <AppSidebarHeader style={{ backgroundColor: "#071835" }} />
            <AppSidebarForm style={{ backgroundColor: "#071835" }}/>
            <AppSidebarNav style={{ backgroundColor: "#071835" }} navConfig={ rol == "ADMIN" ? navigation :navigationResponsable} {...this.props} router={router}/>
            <AppSidebarFooter />
            <AppSidebarMinimizer style={{ backgroundColor: "#091C3D" }} />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb style={{ backgroundColor: "#ac7c54" }}  appRoutes={routes} router={router}/>
            <Container  fluid>
                <Switch >
                  {filterResponsable
                  .map(function(route, idx){
                      return route.component ? (
                        <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        component={route.component}
                        usuario={usuario}
                        auth={auth}
                        rol={rol}
                        permisoAdmin={route.permisoAdmin}
                        permisoResponsable={route.permisoResponsable}
                        render={props => (
                          <route.component {...props} />
                        )} /> 
                    ): (null)
                  })
                  
                  }
                  <Redirect from="/" to="/" />
                </Switch>
                <Switch>
                {filterAdmin
                  .map(function(route, idx){
                      return route.component ? (
                        <PrivateRoutes
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        component={route.component}
                        usuario={usuario}
                        auth={auth}
                        rol={rol}
                        permisoAdmin={route.permisoAdmin}
                        permisoResponsable={route.permisoResponsable}
                        render={props => (
                          <route.component {...props} />
                        )} /> 
                       
                    ): (null)
                  })
                  }
                  <Redirect from="/" to="/" />
                </Switch>
            </Container>
          </main>
          <AppAside style={{ backgroundColor: "#879CC5" }} fixed>
              <DefaultAside     style={{ backgroundColor: "#879CC5" }} />
          </AppAside>
        </div>
        <AppFooter style={{ backgroundColor: "#879CC5" }}>
            <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default WrapperConsumer(DefaultLayout);
