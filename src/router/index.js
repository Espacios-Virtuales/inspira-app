import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/HomeDetails.vue')
  },
  { 
    path: '/login',
    name: 'Login',
    component: () => import('../components/security/SecurityLogin.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/security/SecurityProfile.vue')
  },
  {
    path: '/producto/upload-image',
    name: 'UploadImage',
    component: () => import('../components/form/FormImageUpload.vue')
  },
  {
    path: '/ticket-list',
    name: 'Tickets',
    component: () => import('../views/tickets/TicketsList.vue')
  },
  {
    path: '/ticket-form',
    name: 'FormTicket',
    component: () => import('../components/form/FormTicket.vue')
  },
  {
  path: '/ticket-details',
    name: 'TicketDetails',
    component: () => import('../views/tickets/TicketsDetails.vue')
  },
  {
    path: '/orders',
    name: 'OrdersList',
    component: () => import('../views/order/OrdersList.vue')
  },
  {
    path: '/order-details',
    name: 'OrderDetails',
    component: () => import('../views/order/OrderDetails.vue')
  },
  {
    path: '/client-search',
    name: 'FormClientSearch',
    component: () => import('../components/form/FormClientSearch.vue')
  },
  {
    path: '/client-form',
    name: 'FormClient',
    component: () => import('../components/form/FormClient.vue')
  },
  {
  path: '/client-adress-form',
    name: 'FormAdress',
    component: () => import('../components/form/FormClientAddAdress.vue')
  },
  {
    path: '/client',
    name: 'ClientsLists',
    component: () => import('../views/clients/ClientsList.vue')
  },
  {
    path: '/client-details',
    name: 'ClientDetails',
    component: () => import('../views/clients/ClientDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
