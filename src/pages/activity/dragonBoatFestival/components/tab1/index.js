import React, { useRef } from 'react';
// component

import LuckyGrid from '../luckyGrid';

// styles
import styles from './index.module.scss';
import ActivityDescription from '../editor/activityDescription';
import Rules from '../editor/rules';

const Tab1 = function (props) {
  const {
    content: { content1_1, content1_2 },
  } = props;
  const drawRef = useRef(null);

  const playGame = () => {
    let a = document.createElement('a');
    a.href = '#anchorPoint';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    drawRef.current.playGame();
  };
  return (
    <section className={styles.Tab1}>
      <ActivityDescription content={content1_1}></ActivityDescription>

      <section className={styles.repeatedly}>
        <div className={styles.imgTitle}></div>
        <div className={styles.bamboo}></div>
        <div className={styles.contentBox}>
          <LuckyGrid cRef={drawRef}></LuckyGrid>
        </div>
      </section>

      <div className={styles.fruit}>
        <img src={require('./img/btn_activity.png')} onClick={playGame} />
      </div>

      <div className={styles.cakes}>
        <div>
          今日剩余抽奖次数：
          <span>{drawRef.current && drawRef.current.userInfo.lotteryNum}</span>次
        </div>
      </div>
      <div className={styles.cakes}>
        <div>
          今日累计获得彩金：{' '}
          <span>{drawRef.current && drawRef.current.userInfo.todayAddBonus}</span>元
        </div>
      </div>

      <Rules content={content1_2}></Rules>
    </section>
  );
};

export default Tab1;
