import React from 'react';
import Login from '../views/Login/LoginPage';
import Admin from '../views/Admin/AdminPage';

const routes = [
    {
        path: "/login",
        exact: true,
        main: () => <Login></Login>
    }

];

const private_routes = [
    {
        path: "/",
        exact: true,
        main: () => <Admin></Admin>
    },{
        path: "/admin",
        exact: true,
        main: () => <Admin></Admin>
    }
];

export {
    routes,
    private_routes
};