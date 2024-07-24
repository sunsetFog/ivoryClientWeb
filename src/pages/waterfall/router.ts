export default {
    name: 'waterfall',
    superior: '/home',
    content: () => import(/* webpackChunkName: "waterfall" */ './index'),
};
