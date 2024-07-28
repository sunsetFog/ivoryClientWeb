import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from '@/utils/redux';
import styles from './index.module.scss';

function treasureChest(props: any) {
    return (
        <section className={styles.treasureChest}>
            <div className={styles.bannerBox}></div>
        </section>
    );
}

export default compose(observer)(treasureChest);
