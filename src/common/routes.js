import React from 'react';
import Login from '../views/Login/LoginPage';
import Admin from '../views/Admin/AdminPage';

const routes = [
    {
        path: "/login",
        //exact: true,
        main: () => <Login></Login>
    },{
        path: "/",
        main: () => <Admin></Admin>
    }

];

export default routes;