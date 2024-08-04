/*
路由预加载
*/

import React, { Suspense, lazy } from 'react';

const SuspenseLazy = (props: any) => {
    return <Suspense fallback={<>...</>}>{React.createElement(lazy(props))}</Suspense>;
};

export default SuspenseLazy;
