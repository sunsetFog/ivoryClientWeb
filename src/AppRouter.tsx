import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
// import Tab from '@/view/Tab';
import routes from '@/router';
import SwitchRouter from '@/router/switch';

function App(props: any) {
    const [routerActive, setRouterActive] = useState(true);
    // 通过useRoutes配置实现路由管理
    const element = useRoutes(routes);
    return (
        <>
            {/* <Tab /> */}
            {/* {element} */}
            {routerActive ? element : <SwitchRouter></SwitchRouter>}
        </>
    );
}

export default App;
