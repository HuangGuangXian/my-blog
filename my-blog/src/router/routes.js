import 'nprogress/nprogress.css';
import {
  start,
  done,
  configure,
} from 'nprogress';
import NotFound from '@/views/NotFound.vue';

configure({
  trickleSpeed: 20,
  showSpinner: false,
});

function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function getPageComponent(pageCompResolver) {
  return async () => {
    start();
    if (process.env.NODE_ENV === 'development') {
      await delay(3000);
    }
    const comp = await pageCompResolver();
    done();
    return comp;
  };
}

const routes = [{
  path: '/',
  name: 'Home',
  component: getPageComponent(() => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue')),
  meta: {
    title: '首页',
  },
},
{
  path: '/blog',
  name: 'Blog',
  component: getPageComponent(() => import(/* webpackChunkName: "blog" */ '@/views/Blog/index.vue')),
  meta: {
    title: '文章',
  },
},
{
  path: '/blog/cate/:categoryId',
  name: 'CategoryBlog',
  component: getPageComponent(() => import(/* webpackChunkName: "blog" */ '@/views/Blog/index.vue')),
  meta: {
    title: '文章',
  },
},
{
  path: '/blog/:id',
  name: 'BlogDetail',
  component: getPageComponent(() => import(/* webpackChunkName: "blogdetail" */ '@/views/Blog/Detail.vue')),
  meta: {
    title: '文章详情',
  },
},
{
  path: '/project',
  name: 'Project',
  component: getPageComponent(() => import(/* webpackChunkName: "project" */ '@/views/Project/index.vue')),
  meta: {
    title: '项目&效果',
  },
},
{
  path: '/message',
  name: 'Message',
  component: getPageComponent(() => import(/* webpackChunkName: "message" */ '@/views/Message/index.vue')),
  meta: {
    title: '留言板',
  },
},
{
  path: '/about',
  name: 'About',
  component: getPageComponent(() => import(/* webpackChunkName: "about" */ '@/views/About/index.vue')),
  meta: {
    title: '关于我',
  },
},
{
  name: 'NotFound',
  path: '*',
  component: NotFound,
},
];

export default routes;
