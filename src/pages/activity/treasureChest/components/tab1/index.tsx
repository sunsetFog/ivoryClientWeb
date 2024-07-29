import React, { useRef, useState } from 'react';
// styles
import styles from './index.module.scss';
import pleaseToDo from '@/components/pleaseToDo';

import { lotteryApply } from '@/pages/activity/turntableRaffle/service';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { giftList } from '@/pages/activity/turntableRaffle/constants';

const tab1 = (props: any) => {
    const { venueInfoDetails, recordWay } = props;
    let gifts1 = venueInfoDetails?.signLotteryDetailResp?.gifts || [];
    gifts1 = giftList;
    let gifts2 = [];
    let arrBox = [];
    for (let i = 0; i < gifts1.length; i++) {
        let item = gifts1[i];
        arrBox.push(item);

        if (arrBox.length == 8 || gifts1.length == i + 1) {
            gifts2.push(arrBox);
            arrBox = [];
        }
    }

    // 是否登录
    const { pleaseLogin } = pleaseToDo();
    const [showMsg, setShowMsg] = useState(false);
    const lotterying = useRef(false) as any;
    const { run: runLottery } = useRequest(lotteryApply, {
        manual: true,
        onSuccess(res: any) {
            res = {
                message: '恭喜获得彩金600元',
                data: { id: 600 },
            };
            const { message: potato } = res;
            setShowMsg(true);
            lotterying.current = true;
            setTimeout(() => {
                message.success(potato);
            }, 1700);
            setTimeout(() => {
                setShowMsg(false);
                lotterying.current = false;
            }, 5200);
        },
        onError() {},
    });
    const playWay = () => {
        if (lotterying.current) {
            return;
        }
        if (venueInfoDetails?.signLotteryDetailResp?.lotteryNum?.num == 0) {
            message.info(venueInfoDetails?.signLotteryDetailResp?.lotteryNum?.msg);
            return;
        }
        pleaseLogin(() => {
            handleSumit();
        });
    };
    const handleSumit = () => {
        runLottery({ category: 0 });
    };
    return (
        <div className={styles.tab1}>
            <div className={styles.rapeseed}>
                <div className={styles.leftBox}>
                    <div className={styles.metals}>
                        <div className={styles.saturn}>
                            {gifts2.map((item, index1) => {
                                return (
                                    <ul key={index1}>
                                        <li>宝箱奖励</li>
                                        {item.map((row, index2) => {
                                            return (
                                                <li
                                                    key={index2}
                                                    style={
                                                        item.length < 8 && index1 == 0
                                                            ? { flex: 1 }
                                                            : {}
                                                    }
                                                >
                                                    {row.name.replace('彩金', '').trim()}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                );
                            })}
                        </div>
                        <div className={styles.rainbow}>
                            <span className={styles.sp1}>
                                今日累计获得彩金
                                <span>
                                    {venueInfoDetails?.signLotteryDetailResp?.lotteryNum?.bonus}
                                </span>
                                元
                            </span>
                            <span className={styles.sp1}>
                                今日可抽奖次数
                                <span>
                                    {venueInfoDetails?.signLotteryDetailResp?.lotteryNum?.num}
                                </span>
                                次
                            </span>
                            <span className={styles.sp1}>
                                累计抽奖次数
                                <span>
                                    {venueInfoDetails?.signLotteryDetailResp?.lotteryNum?.costNum}
                                </span>
                                次
                            </span>
                        </div>
                        <div className={styles.spring}>
                            <label
                                onClick={() => {
                                    recordWay('签到');
                                }}
                            >
                                查看抽奖记录
                                <img src={require('../../img/icon_arrow_right.png')} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.jupiter}>
                        {/*
                            apng开宝箱动画
                            在URL中添加?original 表示请求的是原始的、未经处理的图片。
                            项目限制了图片大小，图片3M太大，导致动画没效果
                        */}
                        {showMsg ? (
                            <img src={require('./img/box_open.png?original')} />
                        ) : (
                            <img src={require('./img/box.png')} />
                        )}
                    </div>
                    <div className={styles.mercury}>
                        <button onClick={playWay}>开启签到宝箱</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default tab1;
