import React from 'react';
import Home from '@/routerView/home/index';
import NotFound from '@/routerView/404/index';
/*
react-router-dom升级 v6
Routes 替换 Switch
Navigate 替换 Redirect
element={<App />} 替换 component={App}
不再支持`exact`、`strict`等属性,匹配规则简化了
不设置props的children, 用Outlet了
withRouter删了
*/
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
// import {Provider} from 'react-redux';
// import {hot} from 'react-hot-loader';

const switchRouter = (props) => {
    console.log('--switchRouter--', props);
    return (
        <Routes>
            {/*
              这相当于vue的app.vue    方式2
           */}
            <Route path='/home' element={<Home />}></Route>
            {/*
                注意用的是Route，Router嵌套时用
                exact是精确匹配
            */}
            {/* <Route exact path="/login" component={Login} /> */}

            {/*
                study: 二级路由，方式1
            */}
            {/* <Route path='home' element={<Home />}></Route> */}
            {/* <Route path="/businessModule/dragonBoatFestival" component={dragonBoatFestival}>

            </Route> */}

            {/*
                study: 二级路由，方式2
             */}
            {/* <Router path="/fairyland" component={Fairyland} >
              <Router exact path="/fairyland/docs" component={Docs} />
              <Redirect to="/fairyland/docs" />
            </Router> */}

            {/* <Router6 history={browserHistory} routes={bingo} ></Router6> */}

            {/*
                /去的页面
            */}
            {/* <Redirect from="/" exact to="/home/reactClass/lifeCycle" /> */}

            {/*
                404找不到页面
             */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default switchRouter;
