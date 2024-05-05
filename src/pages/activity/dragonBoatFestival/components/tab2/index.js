import React from 'react';
// component

import { useRequest } from 'ahooks';

// styles
import styles from './index.module.scss';
import ActivityDescription from '../editor/activityDescription';
import TableUnit from '../editor/tableUnit';
import Rules from '../editor/rules';
import { secondApply } from '../../service';

import { message } from 'antd';

// import { useBindPhone } from '@/utils/hooks/useBindPhone';

const Tab2 = function (props) {
  const {
    content: { content2_1, content2_2, content2_3 },
  } = props;
  // const { handleBindPhone } = useBindPhone();
  const { run: runsecondApply } = useRequest(secondApply, {
    manual: true,
    onSuccess: (result) => {
      console.log('--runsecondApply--', result);
      message.success(result.data);
    },
  });

  return (
    <section className={styles.Tab2}>
      <ActivityDescription content={content2_1}></ActivityDescription>
      <TableUnit content={content2_2} imgTitle='img_title_02'></TableUnit>
      <div className={styles.applyBox}>
        <div>
          <p>注：【闯关彩金】【首通彩金】仅按最高档位进行一次派发。</p>
        </div>
        <div>
          <img
            src={require('./img/btn_activity_sqhdyh.png')}
            onClick={() => {
              // handleBindPhone(() => {
                runsecondApply();
              // });
            }}
          />
        </div>
      </div>
      <Rules content={content2_3}></Rules>
    </section>
  );
};

export default Tab2;
