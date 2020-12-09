import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import PageJS from '../views/JS.vue';
import PageRust from '../views/Rust.vue';
import PageBench from '../views/Bench.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Rust',
    component: PageRust,
  },
  {
    path: '/js',
    name: 'JS',
    component: PageJS,
  },
  {
    path: '/bench',
    name: 'Bench',
    component: PageBench,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
