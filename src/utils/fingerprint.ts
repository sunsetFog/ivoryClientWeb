/*
使用 Fingerprint 对象来生成浏览器指纹
*/
import Fingerprint from 'fingerprintjs2';
// utils
import { isBrowser } from '@/utils/detect';
// store
// import homeStore from '@/pages/home/index.store';

const fingerUUID = 'fingerUUID';
export function getFingerprint() {
    return new Promise<string>((resolve) => {
        try {
            Fingerprint.get({}, () => {
                // components.push({
                //   key: 'ip',
                //   value: homeStore?.limitInfo?.location?.ip, // 通过接口获取的到ip
                // });
                // const values = components.map((component) => {
                //   return component.value;
                // });
                const uuid = Fingerprint.x64hash128([1, 3].join(''), 31);
                setUUID(uuid);
                resolve(uuid); // 生成指纹信息
            });
        } catch (e) {
            clearUUID();
            resolve('');
        }
    });
}

// 获取UUID
export function getUUID() {
    const uuid = isBrowser() ? localStorage.getItem(fingerUUID) : '';
    return uuid || '';
}

// 获取UUID
export function setUUID(id: string) {
    localStorage.setItem(fingerUUID, id);
}

// 获取UUID
export function clearUUID() {
    localStorage.removeItem(fingerUUID);
}
