import {makeAutoObservable, runInAction} from 'mobx';
import {fetchDemo} from '@/api/home-two';

class Global {
    constructor() {
        // makeAutoObservable: 自动将所有属性和方法转换为可观察对象。
        makeAutoObservable(this);
    }
    count = 0;

    getFetchGetTest = async () => {
        try {
            await fetchDemo();
            runInAction(() => {
                this.count = 1;
            });
        } catch (err) {
            console.log(err);
        }
    };
}

const globalStore = new Global();
export {globalStore};
