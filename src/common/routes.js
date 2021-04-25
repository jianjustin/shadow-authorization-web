import Login from '../views/Login/LoginPage';
import Admin from '../views/Admin/AdminPage';

import AdminPageHome from '../views/Admin/AdminPageHome';
import AdminPageInbox from '../views/Admin/AdminPageInbox';
import AdminPageDrafts from '../views/Admin/AdminPageDrafts';

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
                path: "/admin/inbox",
                exact: true,
                component: AdminPageInbox
            },{
                path: "/admin/drafts",
                exact: true,
                component: AdminPageDrafts
            }
        ]
    }
];

export {
    routes,
    private_routes
};