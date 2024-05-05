import React from 'react';
// component

import { useRequest } from 'ahooks';

// styles
import styles from './index.module.scss';
import ActivityDescription from '../editor/activityDescription';
import Rules from '../editor/rules';
import { thirdApply } from '../../service';

import { message } from 'antd';
// import { useBindPhone } from '@/utils/hooks/useBindPhone';

const Tab3 = function (props) {
  const {
    content: { content3_1, content3_2 },
  } = props;
  // const { handleBindPhone } = useBindPhone();

  const { run: runthirdApply } = useRequest(thirdApply, {
    manual: true,
    onSuccess: (result) => {
      message.success(result.data);
    },
  });

  return (
    <section className={styles.Tab3}>
      <ActivityDescription content={content3_1}></ActivityDescription>
      <div className={styles.vipMoney}>
        <img src={require('./img/img_vip4.png')} />
        <img src={require('./img/img_vip5.png')} />
        <img src={require('./img/img_vip6.png')} />
        <img src={require('./img/img_vip7.png')} />
        <img src={require('./img/img_vip8.png')} />
        <img src={require('./img/img_vip9.png')} />
        <img src={require('./img/img_vip10.png')} />
      </div>
      <div className={styles.applyBox}>
        <div>
          <p>注：VIP等级统计开始日期为6月22日00:00:00，截止时间为6月30日23:59:59。</p>
        </div>
        <div>
          例：会员A在6月22日00:00:00前VIP等级为VIP5，申请活动优惠后，截止6月30日23:59:59VIP等级为VIP6，活动结束后24小时内系统将派发888元晋级嘉奖彩金到福利中心，1倍有效流水可出款。
        </div>
        <div>
          <img
            src={require('./img/btn_activity_sqhdyh.png')}
            onClick={() => {
              // handleBindPhone(() => {
                runthirdApply();
              // });
            }}
          />
        </div>
      </div>
      <Rules content={content3_2}></Rules>
    </section>
  );
};

export default Tab3;
