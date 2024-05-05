import React, { useEffect } from 'react';

import { formatContentItem, fixedXssContent } from '../../../utils';

import styles from './index.module.scss';

const Rules = (props) => {
  const { content } = props;
  const contentList = formatContentItem(content);

  useEffect(() => {}, []);

  return (
    <section className={styles.Rules}>
      <section>
        <div className={styles.atmosphere}>
          <div className={styles.header}>
            <img src={require('./img/img_title_04.png')} />
          </div>
          <div className={styles.honey}>
            <main>
              {contentList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={styles[`ruleItem${index + 1}`]}
                    dangerouslySetInnerHTML={{ __html: fixedXssContent(item) }}
                  ></div>
                );
              })}
            </main>
          </div>
          <div className={styles.footer}></div>
        </div>
        <div className={styles.lotus}></div>
      </section>
    </section>
  );
};

export default Rules;
