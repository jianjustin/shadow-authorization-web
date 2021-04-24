import React from "react";
import "./App.css";
import Button from '@material-ui/core/Button';
import routes from './common/routes'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App(){
  return (
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
       </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;