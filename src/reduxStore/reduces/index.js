/* eslint-disable import/no-named-as-default */
import {combineReducers} from 'redux';
import home from './home';
import nice from './nice';
/*
合并reducer函数
API 文档：combineReducers 把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数
 */
export default combineReducers({
  home,
  nice
});
