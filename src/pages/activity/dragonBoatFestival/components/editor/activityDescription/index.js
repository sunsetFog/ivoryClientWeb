import * as React from 'react';

/*
样式私有化
react编译器会将文件编译成作用于当前module的对象
改样式文件名。从 xx.scss -> xx.module.scss
*/
import styles from './index.module.scss';

import { formatContentItem, fixedXssContent } from '../../../utils';

const ActivityDescription = (props) => {
    const { content } = props;
    const contentList = formatContentItem(content);
    let contentArr = JSON.parse(JSON.stringify(contentList));
    let boxArr = [];
    boxArr.push(contentArr[0], contentArr[1]);
    contentArr.splice(0, 2);
    let p3 = contentArr.join('');
    p3 = p3.replace(new RegExp('<p>', 'gm'), '');
    p3 = p3.replace(new RegExp('</p>', 'gm'), '<br/>');
    p3 = p3.slice(0, -5);
    p3 = '<p>' + p3 + '</p>';
    boxArr.push(p3);

    return (
        <section className={styles.ActivityDescription}>
            <main>
                {boxArr.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={styles[`noticeItem${index + 1}`]}
                            dangerouslySetInnerHTML={{ __html: fixedXssContent(item) }}
                        ></div>
                    );
                })}
            </main>
        </section>
    );
};

export default ActivityDescription;
