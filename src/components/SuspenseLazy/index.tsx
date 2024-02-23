/*
路由懒加载
*/
// 魔法注释：自定义生成的chunk的名字，可以代码分割打包
/* webpackChunkName:"home" */

// 魔法注释：预获取(prefetch)某个模块，比如需要提前加载的登陆页
/* webpackPrefetch: true */

// 魔法注释：预加载(preload)某个模块
/* webpackPreload : true */

/*

webpackPrefetch 和 webpackPreload都是webpack的魔法注释,用于优化代码加载性能,但有以下几点主要区别:
1. 触发时机不同:
- prefetch是在父chunk加载结束后触发;
- preload是在父chunk加载时就会开始。
2. 加载优先级不同:
- preload会获得很高的加载优先级,会马上开始加载;
- prefetch的优先级较低,会在浏览器空闲时加载。
3. 使用场景不同:
- preload适用于对当前页面必需的模块,如首页的核心组件;
- prefetch适用于可能在未来需要的模块,如用户可能会访问的页面。
4. 流量消耗不同:
- preload会消耗更多流量,要谨慎使用;
- prefetch对带宽影响较小。
5. 兼容性不同:
- preload在低版本浏览器支持不太友好;
- prefetch兼容性较好。

*/
import React, {Suspense, lazy} from 'react';

const SuspenseLazy = (props: any) => {
    return <Suspense fallback={<>...</>}>{React.createElement(lazy(props))}</Suspense>;
};

export default SuspenseLazy;
