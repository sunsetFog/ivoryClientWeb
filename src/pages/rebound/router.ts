export default {
    name: 'rebound',
    menuType: 'type1',
    superior: '',
    content: () => import(/* webpackChunkName: "rebound" */ './index'),
};
