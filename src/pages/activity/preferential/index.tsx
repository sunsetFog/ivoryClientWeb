import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from '@/utils/redux';
import styles from './index.module.scss';
import { tabArr, contentArr } from './constants';
import { useNavigate } from 'react-router-dom';

function preferential(props: any) {
    const navigate = useNavigate();
    const [tabKey, setTabOfKey] = useState(0);
    const tabWay = (index) => {
        setTabOfKey(index);
    };
    const goWay = (item) => {
        navigate(item.path);
    };
    return (
        <section className={styles.preferential}>
            <div className={styles.atmosphere}></div>

            <main className={styles.venus}>
                <article>
                    <aside>
                        <div className={styles.cartoon}>
                            <div className={styles.mercury}>
                                <div>优惠活动</div>
                                <label>
                                    <i></i>
                                </label>
                            </div>
                            <div className={styles.rainbow}>
                                <ul>
                                    {tabArr.map((item, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={
                                                    tabKey == index
                                                        ? styles.activeLi
                                                        : styles.normalcy
                                                }
                                                onClick={() => {
                                                    tabWay(index);
                                                }}
                                            >
                                                {tabKey == index ? (
                                                    <img src={item.icon} />
                                                ) : (
                                                    <img src={item.activeIcon} />
                                                )}

                                                {item.title}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </aside>
                    <main>
                        <ul>
                            {contentArr.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <div
                                            className={styles.scenery}
                                            onClick={() => {
                                                goWay(item);
                                            }}
                                        >
                                            <div className={styles.magic}></div>
                                            {item.title}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </main>
                </article>
            </main>
        </section>
    );
}

export default compose(observer)(preferential);
