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
        <AppHeader style={{ backgroundColor: "#9d6e47" }} fixed>
            <DefaultHeader  onLogout={e=>this.signOut(e)}/>
        </AppHeader>
        <div className="app-body" >
          <AppSidebar style={{ backgroundColor: "#9d6e47" }} fixed display="lg">
            <AppSidebarHeader style={{ backgroundColor: "#9d6e47" }} />
            <AppSidebarForm style={{ backgroundColor: "#9d6e47" }}/>
            <AppSidebarNav style={{ backgroundColor: "#9d6e47" }} navConfig={navigation} {...this.props} router={router}/>
            <AppSidebarFooter />
            <AppSidebarMinimizer style={{ backgroundColor: "#ac7c54" }} />
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
          <AppAside style={{ backgroundColor: "#9d6e47" }} fixed>
              <DefaultAside     style={{ backgroundColor: "#ac7c54" }} />
          </AppAside>
        </div>
        <AppFooter style={{ backgroundColor: "#a18065" }}>
            <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
