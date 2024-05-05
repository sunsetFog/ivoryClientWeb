import React from 'react';

// styles
import styles from './index.module.scss';
import ActivityDescription from '../editor/activityDescription';
import Rules from '../editor/rules';

const Tab5 = function (props) {
  const {
    content: { content5_1, content5_2 },
  } = props;
  return (
    <section className={styles.Tab5}>
      <ActivityDescription content={content5_1}></ActivityDescription>
      <div className={styles.vipMoney}>
        <img src={require('./img/img_hby_01.png')} />
        <img src={require('./img/img_hby_02.png')} />
        <img src={require('./img/img_hby_03.png')} />
        <img src={require('./img/img_hby_04.png')} />
        <img src={require('./img/img_hby_05.png')} />
        <img src={require('./img/img_hby_06.png')} />
        <img src={require('./img/img_hby_07.png')} />
        <img src={require('./img/img_hby_08.png')} />
      </div>
      <Rules content={content5_2}></Rules>
    </section>
  );
};

export default Tab5;
