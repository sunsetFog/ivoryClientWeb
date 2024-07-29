import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';

import styles from './index.module.scss';
import { useRequest, useSetState } from 'ahooks';
import CustomModal from '@/components/customModal';
import { timeList } from './constants';

interface ActivityRecordModalPropsType {
    onRef?: any;
}
function recordModal({ onRef }: ActivityRecordModalPropsType) {
    useImperativeHandle(onRef, () => {
        return {
            initWay: initWay,
        };
    });
    const recRef = useRef<any>();
    const [state, setState] = useSetState({
        recordsArr: [],
    });
    const [petalActive, setPetalOfActive] = useState(0);
    const initWay = () => {
        recRef.current.initWay();
    };
    const marsWay = (item: any, index: any, value: any) => {
        if (value == index) {
            return;
        }
        setPetalOfActive(index);
    };

    const { recordsArr } = state;
    return (
        <CustomModal title='抽奖记录' onRef={recRef}>
            <div className={styles.recordModal}>
                <div className={styles.chinensis}>
                    {timeList.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={petalActive == index ? styles.cherry : styles.grape}
                                onClick={() => {
                                    marsWay(item, index, petalActive);
                                }}
                            >
                                {item.label}
                            </div>
                        );
                    })}
                </div>
                <div className={styles.recordContent}>
                    {recordsArr?.map((item, index) => {
                        return (
                            <p className={styles.fish} key={index}>
                                {item?.lotteryName?.split('彩金')[0]}彩金
                                <span>{item?.lotteryName?.split('彩金')[1]}</span>
                            </p>
                        );
                    })}

                    {recordsArr?.length === 0 && (
                        <div className={styles.emptyBox}>
                            <div></div>
                            <p>暂无活动记录</p>
                        </div>
                    )}
                </div>
            </div>
        </CustomModal>
    );
}

export default recordModal;
