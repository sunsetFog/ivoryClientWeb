/*
    mobx store
    编写没有模块化案例
*/

import {makeAutoObservable} from 'mobx';
// 类
class CounterStore {
    // 1、定义数据
    count = 0;

    // 定义一个原始数据 list
    list = [1, 2, 3, 4, 5, 6];

    // 构造器
    constructor() {
        // 2、把数据弄成响应式
        makeAutoObservable(this);
    }

    // 定义计算属性
    get filterList() {
        return this.list.filter((item) => item > 2);
    }
    // 方法修改list
    setList = () => {
        this.list.push(7, 8, 9);
    };

    // 3、定义action函数（修改数据）
    setCount = () => {
        this.count++;
    };
}

// 实例化类
const counterStore1 = new CounterStore();
// 导出
export {counterStore1};
