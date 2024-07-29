import React, { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';
// react 17的
// import ReactDOM from 'react-dom';
// react 18的
import ReactDOM from 'react-dom/client';

function pleaseToDo() {
    const closeWay = () => {
        const coke = document.getElementById('jelloTemporary');
        if (!coke) return;
        document.body.removeChild(coke);
    };
    const sureWay = () => {
        closeWay();
    };
    const pleaseLogin = (callback = () => {}) => {
        // const { phone } = userStore.userInfo;
        let flag = true;
        if (flag) {
            return callback();
        }
        console.log('nono');
        let hamburger: React.JSX.Element = (
            <section className={styles.pleaseToDo}>
                <main>
                    <header>
                        温馨提示
                        <img src={require('./img/close.png')} onClick={closeWay} />
                    </header>
                    <div>请先登录账号,才能了解更多</div>
                    <footer>
                        <button onClick={sureWay}>确定</button>
                    </footer>
                </main>
            </section>
        );
        const elem = document.createElement('div');
        elem.setAttribute('id', 'jelloTemporary');
        // 这是Node参数添加方式，Element参数添加需要ReactDOM
        document.body.appendChild(elem);
        // react 18
        const root = ReactDOM.createRoot(elem);
        root.render(hamburger);
        // react 17
        // ReactDOM.render(hamburger, elem);
    };
    const pleaseBindPhone = (callback = () => {}) => {
        let flag = false;
        if (flag) {
            return callback();
        }
        let hamburger: React.JSX.Element = (
            <section className={styles.pleaseToDo}>
                <main>
                    <header>
                        温馨提示
                        <img src={require('./img/close.png')} onClick={closeWay} />
                    </header>
                    <div>您需要绑定手机号！</div>
                    <footer>
                        <button onClick={closeWay}>暂不绑定</button>
                        <button style={{ marginLeft: '40px' }} onClick={sureWay}>
                            前往绑定
                        </button>
                    </footer>
                </main>
            </section>
        );
        const elem = document.createElement('div');
        elem.setAttribute('id', 'jelloTemporary');
        document.body.appendChild(elem);
        const root = ReactDOM.createRoot(elem);
        root.render(hamburger);
    };
    return {
        pleaseLogin,
        pleaseBindPhone,
    };
}

export default pleaseToDo;
