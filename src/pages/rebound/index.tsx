import React, { Component } from 'react';

import styles from './index.modules.scss';

class Rebound extends Component {
    public state = {};
    public downX = 0;
    public downY = 0;
    public toX = 0;
    public toY = 0;
    public xMin = 0;
    public xMax = 0;
    public YMin = 0;
    public yMax = 0;
    public fruitRef = React.createRef<HTMLDivElement>();
    public comicRef = React.createRef<HTMLDivElement>();
    public componentDidMount() {
        console.log('--fruitRef--', this.fruitRef.current);
        this.xMax = this.comicRef.current?.clientWidth - this.fruitRef.current?.clientWidth;
        this.yMax = this.comicRef.current?.clientHeight - this.fruitRef.current?.clientHeight;
        console.log('--this.xMax--', this.xMax);
        console.log('--this.yMax--', this.yMax);
        this.fruitRef.current?.addEventListener('mousedown', this.downWay);
    }
    public componentWillUnmount() {
        this.fruitRef.current?.removeEventListener('mousedown', this.downWay);
        this.upWay();
    }
    public downWay = (event) => {
        // 用transform导致offsetLeft不变，因此需要getBoundingClientRect方法，或者改定位移动就能获取offsetLeft值
        let summer = this.fruitRef.current?.getBoundingClientRect();
        console.log(
            '--downWay--',
            this.fruitRef.current?.offsetLeft,
            summer.left,
            this.fruitRef.current?.offsetTop,
            summer.top,
        );
        // this.downX = event.clientX - this.fruitRef.current?.offsetLeft;
        // this.downY = event.clientY - this.fruitRef.current?.offsetTop;
        this.downX = event.clientX - summer.left;
        this.downY = event.clientY - summer.top;
        // // 添加拖拽结束事件处理函数
        document.addEventListener('mouseup', this.upWay);
        // // 添加拖拽移动事件处理函数
        document.addEventListener('mousemove', this.moveWay);
    };
    public moveWay = (event) => {
        console.log('--moveWay--', event);
        this.calculate(event);
    };
    public upWay = (event) => {
        console.log('--upWay--', event);
        document.removeEventListener('mousemove', this.moveWay);
        document.removeEventListener('mouseup', this.upWay);
    };
    public calculate = (event) => {
        let clientX = event.clientX - this.downX;
        let clientY = event.clientY - this.downY;
        if (clientX < 0) {
            this.toX = this.xMin;
        }
        if (clientX >= 0 && clientX <= this.xMax) {
            this.toX = clientX;
        }
        if (clientX > this.xMax) {
            this.toX = this.xMax;
        }
        if (clientY < 0) {
            this.toY = this.YMin;
        }
        if (clientY >= 0 && clientY <= this.yMax) {
            this.toY = clientY;
        }
        if (clientY > this.yMax) {
            this.toY = this.yMax;
        }
        this.fruitRef.current!.style.transform = `translate(${this.toX}px, ${this.toY}px)`;
        // this.fruitRef.current!.style.left = `${this.toX}px`;
        // this.fruitRef.current!.style.top = `${this.toY}px`;
    };

    render() {
        return (
            <div className={styles.rebound} ref={this.comicRef}>
                <div ref={this.fruitRef} className={styles.dragonfly}></div>
            </div>
        );
    }
}

export default Rebound;
