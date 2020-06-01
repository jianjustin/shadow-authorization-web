import store from '../store'
export default [
  {
    path: '*',
    meta: {
      name: '',
      requiresAuth: true
    },
    redirect: {
      path: '/dashboard'
    }
  },
  // This  allows you to have pages apart of the app but no rendered inside the dash
  {
    path: '/',
    meta: {
      name: '',
      requiresAuth: false
    },
    component: resolve => require([`@/views/LoginHome.vue`], resolve),
    // redirect if already signed in
    beforeEnter: (to, from, next) => {
      if (store.getters.authorized) {
        next('/dashboard')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        component: resolve => require([`@/components/LoginForm.vue`], resolve)
      }
    ]
  },
  // add any extra routes that you want rendered in the dashboard as a child below. Change toolbar names here
  {
    path: '/dashboard',
    meta: {
      name: 'Dashboard View',
      requiresAuth: true
    },
    component: resolve => require([`@/views/DashboardView.vue`], resolve),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: resolve => require([`@/components/DashViews/Dashboard.vue`], resolve)
      },
      {
        path: 'sys-resource',
        meta: {
          requiresAuth: true
        },
        component: resolve => require([`@/components/DashViews/sys/SysResourceView.vue`], resolve)
      },
      {
        path: 'sys-role',
        meta: {
          requiresAuth: true
        },
        component: resolve => require([`@/components/DashViews/sys/SysRoleView.vue`], resolve)
      },
      {
        path: 'sys-user',
        meta: {
          requiresAuth: true
        },
        component: resolve => require([`@/components/DashViews/sys/SysUserView.vue`], resolve)
      }
    ]
  }
]
