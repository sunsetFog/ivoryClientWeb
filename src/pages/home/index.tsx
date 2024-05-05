import React, { Component } from 'react';

import styles from './index.modules.scss';
import TabBox from './components/tabBox';
import { Routes, Route, Outlet } from 'react-router-dom';

class Nice extends Component {
    state = {
        water: '水',
    };

    render() {
        const { children } = this.props as any;
        console.log('--yahoo--', this);
        return (
            <section className={styles.homeUnit}>
                <div className={styles.giveBar}>
                    <main>
                        <div className={styles.logoBar}></div>
                        <div className={styles.navigationBar}>
                            <TabBox></TabBox>
                        </div>
                        <div className={styles.userBar}></div>
                    </main>
                </div>
                <article className={styles.pieceBar}>
                    {children}
                    <Outlet />
                </article>
                <footer className={styles.seabed}></footer>
            </section>
        );
    }
}

export default Nice;
