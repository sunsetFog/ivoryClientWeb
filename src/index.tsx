import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from '@/AppRouter';

// 加载全局样式
import '@root/global.css';
import '@root/global.less';
import '@root/global.scss';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLDivElement);
// root.unmount();手动卸载组件
root.render(
    <BrowserRouter basename='/'>
        {/* <StoresProvider value={stores}> */}
        <AppRouter />
        {/* </StoresProvider> */}
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
