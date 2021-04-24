import React from 'react';
import Login from '../views/Login/LoginPage';

const routes = [
    {
        path: "/login",
        //exact: true,
        //sidebar: () => <div>home!</div>,
        main: () => <Login></Login>
      }

];

export default routes;