import React, { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';
import { spinach } from './constants';
/*
排列方式：
流式布局：元素按照自然的文档流从上到下、从左到右排列。
瀑布流布局：元素按照列排列，每列高度不一致。

适用场景：
流式布局：适用于内容高度一致或需要响应式布局的场景，如文章、博客、普通网页。
瀑布流布局：适用于内容高度不一致的场景，如图片墙、商品展示。

js计算定位的
*/
function waterfall(props: any) {
    return (
        <section className={styles.waterfall}>
            <main>
                <ul>
                    {spinach.map((item, index) => {
                        return (
                            <li key={index} style={{ height: item.height }}>
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            </main>
        </section>
    );
}

export default waterfall;
