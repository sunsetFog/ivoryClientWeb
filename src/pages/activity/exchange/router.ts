export default {
    name: '兑换活动',
    superior: '/home',
    content: () => import(/* webpackChunkName: "exchange" */ './index'),
};
