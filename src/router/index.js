import Vue from 'vue';
import VueRouter from 'vue-router';
import Map from '../views/map/Map.vue';
import Register from '../views/register/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'map',
    component: Map,
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
  },

  {
    path: '/register/lambs',
    name: 'registerLambs',
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "registerLambs" */ '../views/register/Lambs.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
