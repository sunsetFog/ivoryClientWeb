import React, { Component } from 'react';
import styles from './index.modules.scss';
class Login extends Component {
    state = {
        water: '水',
    };

    render() {
        return (
            <section className={styles.loginApt}>
                <div className={styles.mercury}>
                    <div className={styles.venus}>{/* <img src=/> */}</div>
                    <div className={styles.cartoon}>
                        <main className={styles.dragonfly}>
                            <div className={styles.butterfly}>
                                <img src='./img/icon_username.png' />
                            </div>
                            <div className={styles.butterfly}>
                                <img src='./img/icon_password.png' />
                            </div>
                            <div className={styles.magic}></div>
                        </main>
                    </div>
                </div>
            </section>
        );
    }
}

export default Login;
