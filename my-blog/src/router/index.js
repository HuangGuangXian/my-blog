import { titleController } from '@/utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

if (!window.VueRouter) {
  Vue.use(VueRouter);
}

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.afterEach((to) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
});

export default router;
