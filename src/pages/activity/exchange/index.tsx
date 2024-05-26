import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from '@/utils/redux';
import styles from './index.module.scss';

function exchange(props: any) {
    return <section className={styles.exchange}>6666</section>;
}

export default compose(observer)(exchange);
