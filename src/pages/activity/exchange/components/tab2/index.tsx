import React, { useRef, useState } from 'react';
// styles
import styles from '../tab1/index.module.scss';
import pleaseToDo from '@/components/pleaseToDo';
import { pizza2 } from '../../constants';
import CustomModal from '@/components/customModal';

const tab2 = (props: any) => {
    const { pleaseBindPhone } = pleaseToDo();
    const recRef = useRef<any>();
    const [arrList, setArrOfList] = useState(pizza2);
    const sureWay = () => {
        pleaseBindPhone(() => {
            recRef.current.initWay();
        });
    };
    const cancelWay = () => {
        recRef.current.closeWay();
    };
    const okWay = () => {
        recRef.current.closeWay();
    };
    return (
        <article>
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
                                            sureWay();
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
            <CustomModal title='提示' onRef={recRef}>
                <div className={styles.storey}>
                    <p>是否确定兑换当前礼品的彩金？兑换后将无法修改</p>
                    <div className={styles.brick}></div>
                    <div className={styles.submit}>
                        <button onClick={cancelWay}>取消</button>
                        <button onClick={okWay}>确定</button>
                    </div>
                </div>
            </CustomModal>
        </article>
    );
};

export default tab2;
