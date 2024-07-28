import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from '@/utils/redux';
import styles from './index.module.scss';

import pleaseToDo from '@/components/pleaseToDo';

function turntableRaffle(props: any) {
    const { pleaseBindPhone } = pleaseToDo();
    const bannerWay = () => {
        pleaseBindPhone(function () {
            console.log('okk');
        });
    };
    return (
        <section className={styles.turntableRaffle}>
            <div className={styles.bannerBox} onClick={bannerWay}></div>
        </section>
    );
}

export default compose(observer)(turntableRaffle);
