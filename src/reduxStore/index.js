import {createStore, applyMiddleware, compose} from 'redux';
// import reduxOrder from 'redux-order';
import reducers from './reduces';
// import DevTools from './DevTools';

// const enhancer = compose(
//   applyMiddleware(reduxOrder()),
//   DevTools.instrument()
// );
/*
使用reducer函数生成store实例
API 文档：createStore实例化vuex
*/
const store = createStore(
    reducers
    //   enhancer
);

// 订阅数据变化
store.subscribe(() => {
    console.log('订阅数据变化: ', store.getState());
});

export default store;
