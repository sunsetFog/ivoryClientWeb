import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from '@/utils/redux';
import styles from './index.module.scss';
import { tabList } from './constants';
import { useNavigate } from 'react-router-dom';

function tabBox(props: any) {
    const navigate = useNavigate();
    const [tabActive, setTabOfActive] = useState(0);
    const [beTitle, setTitle] = useState(tabList[0].title);
    const liRef = useRef<any>();
    const petalWay = (item, index) => {
        setTabOfActive(index);
        setTitle(item.title);
        navigate(item.path);
    };
    useEffect(() => {
        console.log('--liRef--', liRef?.current?.offsetWidth);
    }, []);
    return (
        <section className={styles.tabBox}>
            <div className={styles.rainbow}>
                <div className={styles.autumn}>
                    <ul>
                        {tabList.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    ref={liRef}
                                    onClick={() => {
                                        petalWay(item, index);
                                    }}
                                >
                                    <div>{item.title}</div>
                                </li>
                            );
                        })}
                        <div style={{ clear: 'both' }}></div>
                    </ul>
                    <div
                        className={styles.scenery}
                        style={{
                            transform: `translate(${
                                liRef?.current?.offsetWidth * tabActive
                            }px, 0px)`,
                        }}
                    >
                        <div>{beTitle}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default compose(observer)(tabBox);
