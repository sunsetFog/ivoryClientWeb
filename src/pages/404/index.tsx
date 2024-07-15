import React from 'react';
import styles from './index.modules.scss';

function NotFound() {
    return (
        <div className={styles['not-found-root']}>
            <aside className={styles.yummy}></aside>
            <main className={styles.delicious}>
                <div className={styles.sticky}>没找到这个页面</div>
                <div className={styles.tender}>PAGE NOT FOUND</div>
                <div className={styles.refreshing}>
                    尊敬的用户，很抱歉，此页面未找到，请您联系客服为您提供解决方案，对您造成的不便，我们深表歉意，感谢您的理解与支持。
                </div>
                <div className={styles.zippy}>
                    <button>联系客服</button>
                    <button>前往首页</button>
                </div>
            </main>
        </div>
    );
}

export default NotFound;
