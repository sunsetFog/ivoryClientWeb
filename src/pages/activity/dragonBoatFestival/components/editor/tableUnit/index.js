import React from 'react';

import { fixedXssContent } from '../../../utils';
import styles from './index.module.scss';

const tableUnit = (props) => {
  const { content, imgTitle, tableList } = props;

  return (
    <section className={styles.tableUnit}>
      <main>
        <div className={styles.mercury}>
          <div className={styles.header}>
            <img src={require(`./img/${imgTitle}.png`)} />
          </div>

          {imgTitle == 'img_title_03' && (
            <div className={styles.honey}>
              <table>
                <tbody>
                  <tr>
                    <td>排名</td>
                    <td>会员账号</td>
                    <td>全场馆有效投注</td>
                    <td>排名彩金</td>
                  </tr>
                  {tableList.map(function (item, index) {
                    return (
                      <tr key={index}>
                        <td>{item.rank}</td>
                        <td>{item.name}</td>
                        <td>{item.betAmount}</td>
                        <td>{item.rankMoney}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {imgTitle != 'img_title_03' && (
            <div
              className={styles.honey}
              dangerouslySetInnerHTML={{ __html: fixedXssContent(content) }}
            ></div>
          )}

          <div className={styles.footer}></div>
        </div>
        <div className={styles.lotus}></div>
      </main>
    </section>
  );
};

export default tableUnit;
