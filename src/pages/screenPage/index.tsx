import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from '@/utils/redux';
import styles from './index.module.scss';
import { pointerArr } from './constants';
import { throttle } from 'lodash';
/*
ivory经验

函数防抖: 只执行最后一次
debounce
函数节流：只执行一次
throttle解决触发频繁，一下到底部分页问题
*/
function screenPage(props: any) {
    let screenBox = useRef(null);
    let pageBox = useRef(null);
    let currentPage = useRef(1);
    const [pointerList, setPointerOfList] = useState(pointerArr);
    const dropWay = (num) => {
        currentPage.current = num;
        activeWay();
        // 滚动到指定页面
        screenBox.current.scrollTo({
            top: pageBox.current[num - 1].offsetTop,
            behavior: 'smooth',
        });
    };
    const activeWay = () => {
        let arrList = JSON.parse(JSON.stringify(pointerList));
        for (let i = 0; i < arrList.length; i++) {
            let item = arrList[i];
            if (item.curNum == currentPage.current) {
                item.flagActive = true;
            } else {
                item.flagActive = false;
            }
        }
        setPointerOfList(arrList);
    };
    useEffect(() => {
        pageBox.current = document.getElementsByClassName('pageBox');
        console.log('--pageBox--', pageBox.current);
        screenBox.current.addEventListener(
            'wheel',
            throttle((event) => {
                event.preventDefault();
                console.log('--wheel--', currentPage.current, pageBox.current.length);
                if (event.deltaY > 0) {
                    // 向下滚动，切换到下一页，两值中取最小
                    currentPage.current = Math.min(currentPage.current + 1, pageBox.current.length);
                } else if (event.deltaY < 0) {
                    // 向上滚动，切换到上一页，两值中取最大
                    currentPage.current = Math.max(currentPage.current - 1, 1);
                }
                console.log('--currentPage-6--', currentPage.current);
                activeWay();
                // 滚动到指定页面
                screenBox.current.scrollTo({
                    top: pageBox.current[currentPage.current - 1].offsetTop,
                    behavior: 'smooth',
                });
            }, 1000),
        );
    }, []);
    return (
        <section className={styles.screenPage}>
            <div className={styles.contentBox} ref={screenBox}>
                <main className='pageBox'>
                    <div className={styles.petalBox}>
                        <header>官方合作</header>
                    </div>
                </main>
                <main className='pageBox'>
                    <div className={styles.petalBox}>
                        <header>祝福寄语</header>
                    </div>
                </main>
                <main className='pageBox'>
                    <div className={styles.petalBox}>
                        <header>官方宣传</header>
                    </div>
                </main>
            </div>
            <div className={styles.pointerBox}>
                <div className={styles.lineTop}>
                    <p></p>
                </div>
                <ul>
                    {pointerList.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={item.flagActive ? styles.curActive : styles.curBg}
                                onClick={() => {
                                    dropWay(item.curNum);
                                }}
                            ></li>
                        );
                    })}
                    <div style={{ clear: 'both' }}></div>
                </ul>
                <div className={styles.lineBottom}>
                    <p></p>
                </div>
            </div>
        </section>
    );
}

export default compose(observer)(screenPage);
