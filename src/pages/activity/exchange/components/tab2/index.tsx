import React, { useRef, useState } from 'react';
// styles
import styles from '../tab1/index.module.scss';
import pleaseToDo from '@/components/pleaseToDo';
import { pizza2 } from '../../constants';

const tab2 = (props: any) => {
    const { pleaseLogin } = pleaseToDo();
    const [arrList, setArrOfList] = useState(pizza2);
    return (
        <div className={styles.cabbage}>
            <ul>
                {arrList.map((item, index) => {
                    return (
                        <li key={index} className={(index + 1) % 4 == 1 ? '' : styles.leftApt}>
                            <div
                                className={styles.cartoon}
                                style={{ backgroundImage: `url(${item.img_url})` }}
                            ></div>
                            <div className={styles.bean}>{item.giftName}</div>
                            <div className={styles.spring}>{item.jackpot}元</div>
                            <div className={styles.fabulous}>
                                <button
                                    onClick={() => {
                                        pleaseLogin(() => {});
                                    }}
                                >
                                    立即兑换
                                </button>
                            </div>
                            <div className={styles.dragonfly}>
                                <label>需首存金额</label>
                                <span>¥{item.competency.toLocaleString()}</span>
                                <div style={{ clear: 'both' }}></div>
                            </div>
                            <div className={styles.butterfly}></div>
                            <div className={styles.dragonfly}>
                                <label>流水倍数</label>
                                <span>{item.flowingTimes}倍</span>
                                <div style={{ clear: 'both' }}></div>
                            </div>
                        </li>
                    );
                })}
                <div style={{ clear: 'both' }}></div>
            </ul>
        </div>
    );
};

export default tab2;
