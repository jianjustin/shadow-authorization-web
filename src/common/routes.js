import React from 'react';
import Login from '../views/Login/LoginPage';
import Admin from '../views/Admin/AdminPage';

const routes = [
    {
        path: "/login",
        component: Login
    }

];

const private_routes = [
    {
        path: "/",
        component: Admin
    },{
        path: "/admin",
        exact: true,
        component: Admin
    }
];

export {
    routes,
    private_routes
};