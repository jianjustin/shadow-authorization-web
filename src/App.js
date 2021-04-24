import React from "react";
import "./App.css";
import { routes,private_routes } from './common/routes'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { ProvideAuth, PrivateRoute } from './common/use-auth';

function App(){
  return (
    <ProvideAuth>
      <BrowserRouter>
        <div className="App">
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}

            {private_routes.map((route, index) => (
              <PrivateRoute
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;