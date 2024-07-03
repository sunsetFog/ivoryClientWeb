import React, { Component } from 'react';

import styles from './index.modules.scss';
import TabBox from './components/tabBox';
import { Routes, Route, Outlet } from 'react-router-dom';
import withNavigation from '@/@energy/ivoryDesign/@higherOrder/withNavigation';

class Nice extends Component {
    state = {
        water: '水',
    };
    componentDidMount() {
        this.handleRouteChange();
    }
    // 类组件用const { navigate } = this.props实现路由监听
    componentDidUpdate(prevProps) {
        const { navigate } = this.props as any;
        // console.log('--navigate-1-', navigate);
        // console.log('--navigate-2-', prevProps.navigate);
        if (navigate !== prevProps.navigate) {
            this.handleRouteChange();
        }
    }

    handleRouteChange = () => {
        console.log(`The current URL is ${window.location.pathname}`);
        let homeUnit = document.getElementById('homeUnit');
        let giveBar = document.getElementById('giveBar');
        let pieceBar = document.getElementById('pieceBar');
        let seabed = document.getElementById('seabed');
        let peachHeight = homeUnit.offsetHeight - giveBar.offsetHeight - seabed.offsetHeight;
        if (peachHeight > pieceBar.offsetHeight) {
            pieceBar.style.minHeight = peachHeight + 'px';
        }
    };

    render() {
        const { children } = this.props as any;
        console.log('--yahoo--', this);
        return (
            <section className={styles.homeUnit} id='homeUnit'>
                <div className={styles.giveBar} id='giveBar'>
                    <main>
                        <div className={styles.logoBar}></div>
                        <div className={styles.navigationBar}>
                            <TabBox></TabBox>
                        </div>
                        <div className={styles.userBar}></div>
                    </main>
                </div>
                <article className={styles.pieceBar} id='pieceBar'>
                    {children}
                    <Outlet />
                </article>
                <footer className={styles.seabed} id='seabed'></footer>
            </section>
        );
    }
}

export default withNavigation(Nice);
