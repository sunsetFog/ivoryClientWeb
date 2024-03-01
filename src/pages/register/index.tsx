import React, { Component, createRef } from 'react';
import styles from './index.modules.scss';
import { venus } from './constants';
import withNavigation from '@/@energy/ivoryDesign/@higherOrder/withNavigation';
class Register extends Component {
    state = {
        checkActive: false,
        focusActive1: false,
        focusActive2: false,
        focusActive3: false,
        eyeActive1: false,
        eyeActive2: false,
        errorText1: '',
        errorText2: '',
        errorText3: '',
    };
    public componentDidMount() {
        let nodesArr = document.getElementsByClassName('pumpkin');
        // console.log('--nodesArr--', nodesArr);
        for (let i = 0; i < nodesArr.length; i++) {
            let item = nodesArr[i];
            item.id = 'focusKey' + i;
            let nodesList = item.getElementsByTagName('*');
            for (let k = 0; k < nodesList.length; k++) {
                let row = nodesList[k];
                // console.log('--nodesList--', nodesList);
                row.id = 'focusKey' + i;
            }
        }
    }
    public intRef1 = createRef<HTMLInputElement>();
    public intRef2 = createRef<HTMLInputElement>();
    public intRef3 = createRef<HTMLInputElement>();
    public checkWay = (value) => {
        this.setState({
            checkActive: value,
        });
    };
    public eyeWay1 = (value) => {
        this.setState({
            eyeActive1: value,
        });
    };
    public eyeWay2 = (value) => {
        this.setState({
            eyeActive2: value,
        });
    };
    public dragonfly = (index) => {
        const { navigate } = this.props as any;
        if (index == 0) {
            navigate('/login');
        }
        if (index == 1) {
            navigate('/login');
        }
        if (index == 2) {
        }
    };
    public empty = (event) => {
        console.log('--empty--', event);
        this.intRef1.current.value = '';
    };
    public loginWay = (event) => {
        console.log('--loginWay--', event.target.id);
        if (event.target.id == 'focusKey0') {
            this.intRef1.current.focus();
            this.setState({
                focusActive1: true,
                focusActive2: false,
                focusActive3: false,
            });
        } else if (event.target.id == 'focusKey1') {
            this.intRef2.current.focus();
            this.setState({
                focusActive1: false,
                focusActive2: true,
                focusActive3: false,
            });
        } else if (event.target.id == 'focusKey2') {
            this.intRef3.current.focus();
            this.setState({
                focusActive1: false,
                focusActive2: false,
                focusActive3: true,
            });
        } else {
            this.setState({
                focusActive1: false,
                focusActive2: false,
                focusActive3: false,
            });
        }
    };
    public changeWay1 = (value) => {
        console.log('--changeWay1--', value.target.value);
        this.setState({
            errorText1: '',
        });
    };
    public changeWay2 = (value) => {
        console.log('--changeWay2--', value.target.value);
        if (value.target.value == '') {
            this.setState({
                errorText2: '',
            });
        } else if (value.target.value != '') {
            this.setState({
                errorText2: '请输入8-12位字母+数字的组合',
            });
        }
    };
    public changeWay3 = (value) => {
        console.log('--changeWay3--', value.target.value);
        // 请输入8-12位字母+数字的组合
    };
    render() {
        const {
            checkActive,
            focusActive1,
            focusActive2,
            focusActive3,
            eyeActive1,
            eyeActive2,
            errorText1,
            errorText2,
            errorText3,
        } = this.state;
        return (
            <section
                className={styles.Register}
                onClick={(event) => {
                    this.loginWay(event);
                }}
            >
                <div className={styles.mercury}>
                    <div className={styles.venus}>
                        <img src={require('../login/img/logo.png')} />
                    </div>
                    <div className={styles.cartoon}>
                        <main className={styles.dragonfly}>
                            <div
                                className={`${styles.pumpkin} pumpkin ${
                                    focusActive1 ? styles.focusBorder : ''
                                }`}
                            >
                                <div className={styles.icon1}>
                                    <img src={require('../login/img/user.png')} />
                                </div>
                                <input
                                    ref={this.intRef1}
                                    type='text'
                                    name='username'
                                    maxLength={16}
                                    placeholder='用户名'
                                    onChange={this.changeWay1}
                                />
                                <div className={styles.icon2}>
                                    {focusActive1 ? (
                                        <img
                                            id='focusKey0'
                                            src={require('../login/img/icon_cancle.png')}
                                            onClick={(event) => {
                                                this.empty(event);
                                            }}
                                        />
                                    ) : (
                                        false
                                    )}
                                </div>
                            </div>
                            <div className={styles.autumn}>{errorText1}</div>
                            <div
                                className={`${styles.pumpkin} pumpkin ${
                                    errorText2
                                        ? styles.errorBorder
                                        : focusActive2
                                        ? styles.focusBorder
                                        : ''
                                }`}
                            >
                                <div className={styles.icon1}>
                                    <img src={require('../login/img/password.png')} />
                                </div>
                                <input
                                    ref={this.intRef2}
                                    type={eyeActive1 ? 'text' : 'password'}
                                    name='password'
                                    maxLength={16}
                                    placeholder='密码'
                                    onChange={this.changeWay2}
                                />
                                <div className={styles.icon2}>
                                    {eyeActive1 && focusActive2 ? (
                                        <img
                                            id='focusKey1'
                                            src={require('../login/img/icon_eyes_on.png')}
                                            onClick={() => {
                                                this.eyeWay1(false);
                                            }}
                                        />
                                    ) : null}
                                    {!eyeActive1 && focusActive2 ? (
                                        <img
                                            id='focusKey1'
                                            src={require('../login/img/icon_eyes_off.png')}
                                            onClick={() => {
                                                this.eyeWay1(true);
                                            }}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.autumn}>{errorText2}</div>
                            <div
                                className={`${styles.pumpkin} pumpkin ${
                                    focusActive3 ? styles.focusBorder : ''
                                }`}
                            >
                                <div className={styles.icon1}>
                                    <img src={require('../login/img/password.png')} />
                                </div>
                                <input
                                    ref={this.intRef3}
                                    type={eyeActive2 ? 'text' : 'password'}
                                    name='password'
                                    maxLength={16}
                                    placeholder='确认密码'
                                    onChange={this.changeWay3}
                                />
                                <div className={styles.icon2}>
                                    {eyeActive2 && focusActive3 ? (
                                        <img
                                            id='focusKey2'
                                            src={require('../login/img/icon_eyes_on.png')}
                                            onClick={() => {
                                                this.eyeWay2(false);
                                            }}
                                        />
                                    ) : null}
                                    {!eyeActive2 && focusActive3 ? (
                                        <img
                                            id='focusKey2'
                                            src={require('../login/img/icon_eyes_off.png')}
                                            onClick={() => {
                                                this.eyeWay2(true);
                                            }}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.autumn}>{errorText3}</div>
                            <div className={styles.butterfly}>
                                {checkActive ? (
                                    <img
                                        src={require('../login/img/ischeck.png')}
                                        onClick={() => {
                                            this.checkWay(false);
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={require('../login/img/uncheck.png')}
                                        onClick={() => {
                                            this.checkWay(true);
                                        }}
                                    />
                                )}
                                我已阅读并同意
                                <span
                                    onClick={() => {
                                        this.setState({
                                            storeyActive: true,
                                        });
                                    }}
                                >
                                    相关条款
                                </span>
                                和<span>隐私政策</span>
                            </div>
                            <div className={styles.toGo}>注册</div>
                            <div className={styles.catwoman}>
                                <ul>
                                    {venus.map((item, index) => {
                                        return (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    this.dragonfly(index);
                                                }}
                                            >
                                                <div className={styles.cakes}>
                                                    <div>
                                                        <img src={item.icon} />
                                                    </div>
                                                    <p>
                                                        <span>{item.title}</span>
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        );
    }
}

export default withNavigation(Register);
