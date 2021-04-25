import Login from '../views/Login/LoginPage';
import Admin from '../views/Admin/AdminPage';

import AdminPageHome from '../views/Admin/AdminPageHome';

import User from '../views/User/User';
import Role from '../views/Role/Role';
import Resource from '../views/Resource/Resource';
import Authority from '../views/Authority/Authority';

const routes = [
    {
        path: "/login",
        component: Login
    }

];

const private_routes = [
    {
        path: "/",
        component: Admin,
        children: [
            {
                path: "/",
                exact: true,
                component: AdminPageHome
            },{
                path: "/admin/user",
                exact: true,
                component: User
            },{
                path: "/admin/role",
                exact: true,
                component: Role
            },{
                path: "/admin/resource",
                exact: true,
                component: Resource
            },{
                path: "/admin/authority",
                exact: true,
                component: Authority
            }
        ]
    }
];

export {
    routes,
    private_routes
};