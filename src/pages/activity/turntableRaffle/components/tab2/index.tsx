import React, { useRef, useState } from 'react';
// styles1
import styles1 from '../tab1/index.module.scss';
import styles2 from './index.module.scss';
// components
const { LuckyWheel } = require('react-luck-draw');
import { useSetState, useRequest } from 'ahooks';
import pleaseToDo from '@/components/pleaseToDo';
import { lotteryApply } from '@/pages/activity/turntableRaffle/service';
import { message } from 'antd';
import { giftList } from '@/pages/activity/turntableRaffle/constants';

const tab2 = (props: any) => {
    // 是否登录
    const { pleaseLogin } = pleaseToDo();
    const { venueInfoDetails, recordWay } = props;
    let gifts1 = venueInfoDetails?.betLotteryDetailResp?.gifts || [];
    gifts1 = giftList;
    const sortList = gifts1?.sort((a, b) => {
        return a.money - b.money;
    });
    let arrBox = [];
    for (let i = 0; i < sortList.length; i++) {
        let item = sortList[i];
        arrBox.push({
            fonts: [
                { id: item.id, text: item.name?.replace('彩金', '')?.trim(), fontSize: '24px' },
            ],
        });
    }
    const myWheel = useRef<any>(null);
    const winMessage = useRef() as any;
    const lotterying = useRef(false) as any;
    const keyWay = (num: any = 0) => {
        if (num == 6 || num == 7 || num == 8 || num == 9) {
            return num;
        } else {
            return 6;
        }
    };
    const [state] = useSetState({
        buttons1: [
            {
                imgs: [
                    {
                        src: require(`./img/button.png`),
                        width: 246,
                        height: 246,
                        top: -124,
                    },
                ],
            },
        ],
        defaultConfig: {
            gutter: 0,
            stopRange: 0,
            offsetDegree: 0,
            decelerationTime: 1500,
        },
        defaultStyle: {
            background: 'rgba(255, 255, 255, 0)',
        },
        prizes: arrBox,
        blocks: [
            {
                padding: '25px',
                background: 'rgba(255, 255, 255, 0)',
                imgs: [
                    {
                        src: require(`./img/${keyWay(arrBox.length)}.png`),
                        width: '100%',
                        height: '100%',
                        rotate: true,
                    },
                ],
            },
        ],
    });
    const { run: runLottery } = useRequest(lotteryApply, {
        manual: true,
        onSuccess(res: any) {
            res = {
                message: '恭喜获得彩金500元',
                data: { id: 500 },
            };
            const { data, message } = res;
            lotterying.current = true;
            myWheel.current.play();
            winMessage.current = message;
            let id = data?.id;
            const index = arrBox.findIndex((item) => item?.fonts[0]?.id === id);
            setTimeout(() => {
                myWheel.current.stop(index);
            }, 2500);
        },
        onError() {
            lotterying.current = false;
        },
    });
    const endWay = () => {
        lotterying.current = false;
        message.success(winMessage.current);
    };
    const playWay = () => {
        if (lotterying.current) {
            return;
        }
        if (venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.num == 0) {
            message.info('今日可抽奖次数0次');
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
        <div className={`${styles1.tab1} ${styles2.tab2}`}>
            <div className={styles1.cauliflower}>
                <main className={styles2.petal2}>
                    <LuckyWheel
                        width={610}
                        height={610}
                        ref={myWheel}
                        prizes={state.prizes}
                        buttons={state.buttons1}
                        blocks={state.blocks}
                        defaultConfig={state.defaultConfig}
                        defaultStyle={state.defaultStyle}
                        onEnd={endWay}
                    ></LuckyWheel>
                    <button className={styles1.toGo} onClick={playWay}></button>
                </main>
            </div>
            <div className={styles1.papaya}>
                <button onClick={playWay}>开启转盘</button>
            </div>
            <div className={styles1.scenery}>
                <div
                    onClick={() => {
                        recordWay('投注');
                    }}
                >
                    查看抽奖记录
                    <img src={require('../../img/icon_arrow_right.png')} />
                </div>
            </div>
            <div className={styles1.rainbow}>
                <span className={styles1.sp1}>
                    今日累计获得彩金
                    <span>{venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.bonus}</span>元
                </span>
                <span className={styles1.sp1}>
                    今日可抽奖次数
                    <span>{venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.num}</span>次
                </span>
                <span className={styles1.sp1}>
                    累计抽奖次数
                    <span>{venueInfoDetails?.betLotteryDetailResp?.lotteryNum?.costNum}</span>次
                </span>
            </div>
        </div>
    );
};

export default tab2;
