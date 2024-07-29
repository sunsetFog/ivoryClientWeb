import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from '@/utils/redux';
import styles from './index.module.scss';
import { Tabs } from 'antd';
import Tab1 from './components/tab1';
import Tab2 from './components/tab2';
import RecordModal from '@/pages/activity/turntableRaffle/components/recordModal';

function treasureChest(props: any) {
    const recRef = useRef<any>();
    const [_activeKey, setActiveOfKey] = useState('1');
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
        <section className={styles.treasureChest}>
            <div className={styles.bannerBox}></div>
            <div className={styles.mercury}>
                <div className={styles.pumpkin}>
                    <Tabs defaultActiveKey={defaultWay()} onChange={tabChange}>
                        <Tabs.TabPane tab='签到宝箱' key='1'>
                            <Tab1 venueInfoDetails={{}} recordWay={recordWay}></Tab1>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='投注/存款宝箱' key='2'>
                            <Tab2 venueInfoDetails={{}} recordWay={recordWay}></Tab2>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
            <main className={styles.cabbage}>
                <div className={styles.titleBox}>活动简介</div>
                <div className={styles.pumpkin}></div>
            </main>
            <RecordModal onRef={recRef}></RecordModal>
        </section>
    );
}

export default compose(observer)(treasureChest);