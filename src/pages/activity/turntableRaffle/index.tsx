import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from '@/utils/redux';
import styles from './index.module.scss';

import pleaseToDo from '@/components/pleaseToDo';
import { Tabs } from 'antd';
import Tab1 from './components/tab1';
import Tab2 from './components/tab2';

function turntableRaffle(props: any) {
    const { pleaseBindPhone } = pleaseToDo();
    const recRef = useRef<any>();
    const [_activeKey, setActiveOfKey] = useState('1');

    const bannerWay = () => {
        pleaseBindPhone(function () {
            console.log('okk');
        });
    };
    const tabChange = (activeKey) => {
        setActiveOfKey(activeKey);
    };
    const defaultWay = () => {
        return '1';
    };
    const recordWay = (value: any) => {
        recRef.current.initWay(0, value);
    };
    return (
        <section className={styles.turntableRaffle}>
            <div className={styles.bannerBox} onClick={bannerWay}></div>
            <div className={styles.mercury}>
                <div className={styles.pumpkin}>
                    <Tabs defaultActiveKey={defaultWay()} onChange={tabChange}>
                        <Tabs.TabPane tab='签到转盘' key='1'>
                            <Tab1 venueInfoDetails={{}} recordWay={recordWay}></Tab1>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='投注/存款转盘' key='2'>
                            <Tab2 venueInfoDetails={{}} recordWay={recordWay}></Tab2>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
            <main className={styles.cabbage}>
                <div className={styles.titleBox}>活动简介</div>
                <div className={styles.pumpkin}></div>
            </main>
        </section>
    );
}

export default compose(observer)(turntableRaffle);
