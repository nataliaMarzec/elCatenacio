import React, { Component, Suspense } from 'react';
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
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app"  >
        <AppHeader style={{ backgroundColor: "#041024" }} fixed>
            <DefaultHeader  onLogout={e=>this.signOut(e)}/>
        </AppHeader>
        <div className="app-body" >
          <AppSidebar style={{ backgroundColor: "#071835" }} fixed display="lg">
            <AppSidebarHeader style={{ backgroundColor: "#071835" }} />
            <AppSidebarForm style={{ backgroundColor: "#071835" }}/>
            <AppSidebarNav style={{ backgroundColor: "#071835" }} navConfig={navigation} {...this.props} router={router}/>
            <AppSidebarFooter />
            <AppSidebarMinimizer style={{ backgroundColor: "#091C3D" }} />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb style={{ backgroundColor: "#ac7c54" }}  appRoutes={routes} router={router}/>
            <Container  fluid>
                <Switch >
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/home" />
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

export default DefaultLayout;
