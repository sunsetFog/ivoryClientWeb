export default {
    name: '个人中心',
    superior: '/home',
    content: () => import(/* webpackChunkName: "account" */ './index'),
};
