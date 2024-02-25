/*
 * react-router-dom v6 官方文档
 * https://reactrouter.com/en/v6.3.0/getting-started/installation
 */
import React from 'react';
import SuspenseLazy from '@/components/SuspenseLazy';
import { Navigate, RouteObject } from 'react-router-dom';
import { extend } from 'dayjs';

const Home = SuspenseLazy(() => import(/* webpackChunkName:"home" */ '@/pages/home'));

const NotFound = SuspenseLazy(() => import(/* webpackChunkName:"not-found" */ '@/pages/404'));

const Login = SuspenseLazy(() => import(/* webpackChunkName:"login" */ '@/pages/login'));

let firstArr = [];
let homeArr = [];
const files = require.context('../', true, /\/router\.ts$/);
console.log('files.keys()===', files.keys());
files.keys().forEach((item) => {
    let filesObj = files(item).default;
    // console.log('context===', filesObj);
    filesObj.path = item.slice(7, -10);
    filesObj.element = SuspenseLazy(filesObj.content);
    delete filesObj.content;
    if (filesObj.superior == '/home') {
        homeArr.push(filesObj);
    }
    if (!filesObj.superior) {
        firstArr.push(filesObj);
    }
});

// const routes: RouteObject[] = [
const routes = [
    ...firstArr,
    {
        path: '/',
        element: <Navigate to='home' />, // 重定向
    },
    {
        path: 'home',
        element: Home,
        children: [
            ...homeArr,
            // {
            //     path: '/home/reactClass/lifeCycle',
            //     element: LifeCycle,
            //     name: '生命周期',
            //     menuType: 'type1',
            // },
        ],
    },
    {
        path: '/login',
        element: Login,
        name: '端午活动',
    },
    // 未匹配到页面
    {
        path: '*',
        element: NotFound,
    },
];

export default routes;
