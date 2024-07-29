import React, { useRef, useState } from 'react';
// styles1
import styles1 from '../tab1/index.module.scss';
import pleaseToDo from '@/components/pleaseToDo';
import { lotteryApply } from '@/pages/activity/turntableRaffle/service';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { giftList } from '@/pages/activity/turntableRaffle/constants';

const tab2 = (props: any) => {
    const { venueInfoDetails, recordWay } = props;
    let gifts1 = venueInfoDetails?.betLotteryDetailResp?.gifts || [];
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
                message: '恭喜获得彩金200元',
                data: { id: 200 },
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
        if (venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.num == 0) {
            message.info(venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.msg);
            return;
        }
        pleaseLogin(() => {
            handleSumit();
        });
    };
    const handleSumit = () => {
        runLottery({ category: 1 });
    };
    return (
        <div className={styles1.tab1}>
            <div className={styles1.rapeseed}>
                <div className={styles1.leftBox}>
                    <div className={styles1.metals}>
                        <div className={styles1.saturn}>
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
                        <div className={styles1.rainbow}>
                            <span className={styles1.sp1}>
                                今日累计获得彩金
                                <span>
                                    {venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.bonus}
                                </span>
                                元
                            </span>
                            <span className={styles1.sp1}>
                                今日可抽奖次数
                                <span>
                                    {venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.num}
                                </span>
                                次
                            </span>
                            <span className={styles1.sp1}>
                                累计抽奖次数
                                <span>
                                    {venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.costNum}
                                </span>
                                次
                            </span>
                        </div>
                        <div className={styles1.spring}>
                            <label
                                onClick={() => {
                                    recordWay('投注');
                                }}
                            >
                                查看抽奖记录
                                <img src={require('../../img/icon_arrow_right.png')} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles1.rightBox}>
                    <div className={styles1.jupiter}>
                        {showMsg ? (
                            <img src={require('./img/box_open.png?original')} />
                        ) : (
                            <img src={require('./img/box.png')} />
                        )}
                    </div>
                    <div className={styles1.mercury}>
                        <button onClick={playWay}>开启宝箱</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default tab2;
