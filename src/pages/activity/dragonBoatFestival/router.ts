export default {
    name: '端午活动',
    superior: '/home',
    content: () => import(/* webpackChunkName: "dragonBoatFestival" */ './index'),
};
