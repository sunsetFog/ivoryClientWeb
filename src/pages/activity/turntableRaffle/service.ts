import { get, post } from '@/utils/request';
let domain = 'http://localhost:8062/sky';

export function lotteryApply(params: any) {
    return post(domain + '/dragonBoat2023/first/infoList', {
        transformResponse: (data) => data,
    });
}
