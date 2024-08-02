import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from '@/@energy/ivoryDesign/@utils/redux';
import styles from './index.module.scss';
import { Tabs } from 'antd';
import Tab1 from './components/tab1';
import Tab2 from './components/tab2';

function exchange(props: any) {
    const [_activeKey, setActiveOfKey] = useState('1');
    const tabChange = (activeKey) => {
        setActiveOfKey(activeKey);
    };
    const defaultWay = () => {
        return '1';
    };
    return (
        <section className={styles.exchange}>
            <div className={styles.bannerBox}></div>
            <div className={styles.mercury}>
                <div className={styles.pumpkin}>
                    <Tabs defaultActiveKey={defaultWay()} onChange={tabChange}>
                        <Tabs.TabPane tab='首存豪礼' key='1'>
                            <Tab1></Tab1>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='投注豪礼' key='2'>
                            <Tab2></Tab2>
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

export default compose(observer)(exchange);
