import React, { useRef, useState } from 'react';
// styles1
import styles1 from '../tab1/index.module.scss';
import pleaseToDo from '@/components/pleaseToDo';
import { lotteryApply } from '../../../../services';
import { useRequest } from 'ahooks';
import 'animate.css';
import { message } from 'antd';

const tab2 = (props: any) => {
    const { venueInfoDetails, recordWay, updateVenueInfo } = props;
    const gifts1 = venueInfoDetails?.betLotteryDetailResp?.gifts || [];
    const venueList = venueInfoDetails?.betLotteryDetailResp?.venueList || [];
    const flowTimes = venueInfoDetails?.betLotteryDetailResp?.flowTimes || 1;
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
    const [modalVisiable, setModalOfVisiable] = useState(false);
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
        if (venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.num == 0) {
            message.info(venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.msg);
            return;
        }
        pleaseLogin(() => {
            if (venueList?.length > 0) {
                showWay();
            } else {
                handleSumit();
            }
        });
    };
    const showWay = () => {
        setModalOfVisiable(true);
    };
    const handleSumit = () => {
        if (!venueId && venueList?.length > 0) {
            return message.info('请选择场馆后抽奖');
        }
        setModalOfVisiable(false);
        runLottery({ category: 1, apiId: venueId });
        setVenueId(null);
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
