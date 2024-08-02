import { get, post } from '@/@energy/ivoryDesign/@http/fetch';
let domain = 'http://localhost:8062/sky';

export function lotteryApply(params: any) {
    return post(domain + '/dragonBoat2023/first/infoList', {});
}
