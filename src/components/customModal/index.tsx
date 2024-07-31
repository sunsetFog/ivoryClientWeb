import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';

import styles from './index.module.scss';

interface ActivityRecordModalPropsType {
    children?: React.ReactNode; // 子内容
    title?: string; // 标题
    onRef?: any; // ref
    show?: boolean; // 展示
}

function customModal({ children, title, onRef, show }: ActivityRecordModalPropsType) {
    useImperativeHandle(onRef, () => {
        return {
            initWay: initWay,
            closeWay: closeWay,
        };
    });
    const [isVisible, setIsOfVisible] = useState(show || false);
    const closeWay = () => {
        document.body.style.overflow = '';
        setIsOfVisible(false);
    };
    const initWay = () => {
        document.body.style.overflow = 'hidden';
        setIsOfVisible(true);
    };
    const defaultWay = (event) => {
        var ev = event || window.event;
        ev.stopPropagation();
    };
    useEffect(() => {
        if (!isVisible) {
            const coke = document.getElementById('jelloTemporary');
            if (!coke) return;
            document.body.removeChild(coke);
        }
    }, [isVisible]);
    return isVisible ? (
        <article className={styles.customModal} onClick={closeWay}>
            <main onClick={defaultWay}>
                <header>
                    {title || '温馨提示'}
                    <img src={require('./img/close.png')} onClick={closeWay} />
                </header>
                {children}
            </main>
        </article>
    ) : null;
}

export default customModal;
