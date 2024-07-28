import React, { useRef, useState } from 'react';
// styles
import styles from './index.module.scss';
import pleaseToDo from '@/components/pleaseToDo';

import { lotteryApply } from '../../../../services';
import { useRequest } from 'ahooks';
import 'animate.css';
import { message } from 'antd';

const tab1 = (props: any) => {
    const { venueInfoDetails, recordWay, updateVenueInfo } = props;
    const gifts1 = venueInfoDetails?.signLotteryDetailResp?.gifts || [];
    const venueList = venueInfoDetails?.signLotteryDetailResp?.venueList || [];
    const flowTimes = venueInfoDetails?.signLotteryDetailResp?.flowTimes || 1;
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
    const [venueId, setVenueId] = useState(null);
    const [showMsg, setShowMsg] = useState(false);
    const lotterying = useRef(false) as any;
    const { run: runLottery } = useRequest(lotteryApply, {
        manual: true,
        onSuccess(res: any) {
            const { message } = res;
            setShowMsg(true);
            lotterying.current = true;
            updateVenueInfo();
            setTimeout(() => {
                message.success(message);
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
        if (!venueId && venueList?.length > 0) {
            return message.info('请选择场馆后抽奖');
        }
        runLottery({ category: 0, apiId: venueId });
        setVenueId(null);
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
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='14'
                                    height='14'
                                    viewBox='0 0 14 14'
                                    fill='none'
                                >
                                    <g clip-path='url(#clip0_2863_26999)'>
                                        <path
                                            d='M4.5 2L9.5 7L4.5 12'
                                            stroke='#356280'
                                            stroke-width='1.5'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id='clip0_2863_26999'>
                                            <rect width='14' height='14' fill='white' />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.rightBox}>
                    <div className={styles.jupiter}>
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
