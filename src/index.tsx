import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoresProvider, stores } from '@/store';
import AppRouter from '@/AppRouter';
// toolkitStore的使用
import { Provider, connect } from 'react-redux'; // 用Provider, 才能用connect
import toolkitStore from '@/reduxToolkitStore';

// 加载全局样式
import '@root/global.css';
import '@root/global.less';
import '@root/global.scss';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLDivElement);
// root.unmount();手动卸载组件
root.render(
    <BrowserRouter basename='/'>
        <StoresProvider value={stores}>
            <AppRouter />
        </StoresProvider>
        {/* <Provider store={toolkitStore}>
            <AppRouter />
        </Provider> */}
    </BrowserRouter>,
    // <HashRouter>
    //     <StoresProvider value={stores}>
    //         <AppRouter />
    //     </StoresProvider>
    // </HashRouter>
);
