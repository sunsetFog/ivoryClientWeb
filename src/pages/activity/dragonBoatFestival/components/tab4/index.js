import React, { useState, useEffect } from 'react';
// component

import { useRequest } from 'ahooks';
import { fourthTable } from '../../service';

// styles
import styles from './index.module.scss';
import ActivityDescription from '../editor/activityDescription';
import Rules from '../editor/rules';
import TableUnit from '../editor/tableUnit';

const Tab4 = function (props) {
  const {
    content: { content4_1, content4_2 },
  } = props;
  const [tableList, setTableList] = useState([]);

  const { run: runfourthTable } = useRequest(fourthTable, {
    manual: true,
    onSuccess: (result) => {
      console.log("---tableList---", result)
      setTableList(result.data || []);
    },
  });

  useEffect(() => {
    runfourthTable(2023);
  }, []);

  return (
    <section className={styles.Tab4}>
      <ActivityDescription content={content4_1}></ActivityDescription>
      <TableUnit tableList={tableList} imgTitle='img_title_03'></TableUnit>
      <div className={styles.applyBox}>
        <p>注：排行榜每天下午15:00点更新前一日的数据，排名仅展示该区间的最后1名。</p>
      </div>
      <Rules content={content4_2}></Rules>
    </section>
  );
};

export default Tab4;
