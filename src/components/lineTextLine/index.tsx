import React, {Component} from 'react';

import styles from './index.modules.scss';

class LineTextLine extends Component<any, any> {
    state = {};
    render() {
        const {
            state: {},
            props: {leftCakes = false, children}
        } = this;
        return (
            <section className={styles.lineTextLine}>
                <hr className={leftCakes ? styles.swan : styles.butterfly} />
                {children}
                <hr />
            </section>
        );
    }
}

export default LineTextLine;
