export default [
  {
    path: '/auth',
    layout: false,
    routes: [
      { path: '/auth/login', component: './auth/Login' },
      { path: '/auth/register', component: './auth/Register' },
      { path: '/auth/forgot-password', component: './auth/ForgotPassword' },
      { path: '/auth/reset-password', component: './auth/ResetPassword' },
      { redirect: '/auth/login' },
    ],
  },

  // ... routes khác shop/admin của bạn

  { path: '/', redirect: '/auth/login' },
  { component: './404' },
];
