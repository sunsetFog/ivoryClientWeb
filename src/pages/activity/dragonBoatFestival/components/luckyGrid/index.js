import React, { useEffect, useRef, useImperativeHandle } from 'react';
// component
import { LuckyGrid } from 'react-luck-draw';

import { useSetState, useRequest } from 'ahooks';
import { lotteryRecord, lotteryApply } from '../../service';

// styles
import styles from './index.module.scss';

import { awardList } from './constants';

// import { useBindPhone } from '@/utils/hooks/useBindPhone';

import { message } from 'antd';

const LuckyGridBox = function ({ cRef }) {
  // const { handleBindPhone } = useBindPhone();

  const [state, setState] = useSetState({
    blocks: [{ padding: '8px' }],
    unlockedPrizes: [],
    defaultConfig: {
      speed: 10,
    },
    defaultStyle: {},
    activeStyle: {
      background: 'rgba(0, 0, 0, 0)',
    },
    allActive: false,
    recordList: [],
    userInfo: {
      lotteryNum: 0,
      todayAddBonus: 0,
    },
    playLoading: false,
    showPrizes: [],
    unlockGiftId: -1,
  });

  const unlockedRef = useRef();

  const {
    blocks,
    unlockedPrizes,
    defaultConfig,
    defaultStyle,
    activeStyle,
    allActive,
    recordList,
    userInfo,
    playLoading,
    showPrizes,
    unlockGiftId,
  } = state;

  const { run: runlotteryRecord } = useRequest(lotteryRecord, {
    manual: true,
    onSuccess: (result, paramsArr) => {
      setState({
        playLoading: false,
      });
      let recordList = JSON.parse(JSON.stringify(result.recordList || []));
      for (let i = 0; i < recordList.length; i++) {
        let item = recordList[i];
        for (let j = i + 1; j < recordList.length; j++) {
          let row = recordList[j];
          if (item.createdAt == row.createdAt) {
            row.giftName = row.giftName.replace('恭喜您抽奖获得', '');
            row.giftName = row.giftName.replace('恭喜您获得', '');
            item.giftName = item.giftName + ' + ' + row.giftName;
            recordList.splice(j, 1);
            j--;
          }
        }
      }
      for (let i = 0; i < recordList.length; i++) {
        const item = recordList[i];
        if (item.giftName.indexOf('<span>') == -1) {
          item.giftName = item.giftName.replace(new RegExp('彩金', 'gm'), '彩金<span>');
        }
        if (item.giftName.indexOf('</span>') == -1) {
          item.giftName = item.giftName.replace(new RegExp('元', 'gm'), '</span>元');
        }
        item.content = item.createdAt + ' ' + item.giftName;
      }

      setState({
        recordList: recordList,
        userInfo: result.nums || {},
      });

      let showList = JSON.parse(JSON.stringify(awardList));
      let unlockedList = JSON.parse(JSON.stringify(awardList));

      for (let i = 0; i < showList.length; i++) {
        let item = showList[i];
        if (item.src) {
          if ((result.unlockLineList || []).indexOf(item.index) == -1) {
            item.imgs = [
              {
                src: item.src,
                width: '100%',
                height: '100%',
                activeSrc: item.activeSrc,
              },
            ];
          } else {
            item.imgs = [
              {
                src: item.activeSrc,
                width: '100%',
                height: '100%',
                activeSrc: item.activeSrc,
              },
            ];
          }
        } else {
          if ((result.unlockGiftList || []).indexOf(item.index) == -1) {
            item.imgs = [
              {
                src: require('./img/gua.png'),
                width: '100%',
                height: '100%',
                activeSrc: require('./img/gua.png'),
              },
            ];
          } else {
            item.imgs = [
              {
                src: require('./img/czz_img_yjs_01.png'),
                width: '100%',
                height: '100%',
                activeSrc: require('./img/czz_img_yjs_01.png'),
              },
            ];
          }
        }
      }

      setState({
        showPrizes: showList,
      });

      unlockedList = unlockedList.filter(function (item) {
        return !item.src && (result.unlockGiftList || []).indexOf(item.index) == -1;
      });

      for (let i = 0; i < unlockedList.length; i++) {
        let item = unlockedList[i];
        item.borderRadius = '0';
        if (unlockedList.length == 1) {
          item.imgs = [
            {
              src: require('./img/czz_img_wjs.png'),
              width: '100%',
              height: '100%',
              activeSrc: require('./img/czz_img_yjs_01.png'),
            },
          ];
        } else {
          item.imgs = [
            {
              src: require('./img/czz_img_wjs.png'),
              width: '100%',
              height: '100%',
              activeSrc: require('./img/czz_img_yjs.png'),
            },
          ];
        }
      }

      if ((result.unlockLineList || []).indexOf(12) == -1) {
        setState({
          allActive: false,
        });
      } else {
        setState({
          allActive: true,
        });
      }

      if (paramsArr.length > 0 && paramsArr[0] == 'stop') {
        sessionStorage.setItem('unlockedList', JSON.stringify(unlockedList));
        let arrBox = [];
        let record2List = JSON.parse(JSON.stringify(result.recordList || []));
        for (let i = 0; i < record2List.length; i++) {
          let item = record2List[i];
          if (item.createdAt == record2List[0].createdAt) {
            arrBox.push(item);
          }
        }
        let messageStr = '';
        for (let i = 0; i < arrBox.length; i++) {
          let item = arrBox[i];
          if (i == 0) {
            messageStr += item.giftName;
          } else {
            item.giftName = item.giftName.replace('恭喜您抽奖获得', '');
            item.giftName = item.giftName.replace('恭喜您获得', '');
            messageStr += ' + ' + item.giftName;
          }
        }
        message.success(messageStr);
      } else {
        setState({
          unlockedPrizes: unlockedList,
        });
      }
    },
  });

  useEffect(() => {
    sessionStorage.setItem('unlockedList', '');
    runlotteryRecord();
  }, []);
  useEffect(() => {
    if (unlockGiftId != -1) {
      unlockedRef.current.play();
      let timeNum = 4000;
      if (unlockedPrizes.length == 1) {
        timeNum = 1;
      }
      setTimeout(() => {
        let index = 0;
        for (let i = 0; i < unlockedPrizes.length; i++) {
          let item = unlockedPrizes[i];
          if (item.index == unlockGiftId) {
            index = i;
          }
        }
        unlockedRef.current.stop(index);
      }, timeNum);
      setState({
        unlockGiftId: -1,
      });
    }
  }, [unlockGiftId]);

  const endWay = () => {
    runlotteryRecord('stop');
  };

  useImperativeHandle(cRef, () => ({
    playGame: () => {
      // handleBindPhone(() => {
        if (playLoading) {
          return;
        }

        setState({
          playLoading: true,
        });
        lotteryApply({})
          .then((result) => {
            if (sessionStorage.getItem('unlockedList')) {
              let unlockedList = JSON.parse(sessionStorage.getItem('unlockedList'));
              setState({
                unlockedPrizes: unlockedList,
              });
              sessionStorage.removeItem('unlockedList');
            }
            setState({
              unlockGiftId: result.data.unlockGiftId,
            });
          })
          .catch(() => {
            setState({
              playLoading: false,
            });
          });
      // });
    },
    userInfo,
  }));

  return (
    <section className={styles.LuckyGridBox}>
      <div className={styles.anchorPoint} id='anchorPoint'></div>
      <section className={styles.repeatedly}>
        <LuckyGrid
          ref={unlockedRef}
          width={950}
          height={950}
          rows={6}
          cols={6}
          blocks={blocks}
          prizes={unlockedPrizes}
          activeStyle={activeStyle}
          defaultConfig={defaultConfig}
          defaultStyle={defaultStyle}
          onEnd={endWay}
        ></LuckyGrid>

        <main>
          <LuckyGrid
            width={950}
            height={950}
            rows={6}
            cols={6}
            blocks={blocks}
            prizes={showPrizes}
            activeStyle={activeStyle}
            defaultConfig={defaultConfig}
            defaultStyle={defaultStyle}
            onEnd={endWay}
          ></LuckyGrid>
        </main>
      </section>
      <div className={styles.swan}>
        <img
          src={
            allActive ? require('./img/czz_img_12_sel.png') : require('./img/czz_img_12_unsel.png')
          }
        />
      </div>
      <div className={styles.cartoon}>
        <ul>
          {recordList.map(function (item, index) {
            return <li key={index} dangerouslySetInnerHTML={{ __html: item.content }}></li>;
          })}
        </ul>
      </div>
    </section>
  );
};

export default LuckyGridBox;
