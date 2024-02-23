export function delay(time = 1000) {
    return new Promise((resolve) => setTimeout(() => resolve(time), time));
}

// 格式化时间
export function formatTime(mss: any) {
    // const minutes = (mss % (60 * 60)) / 60;
    const minutes = Math.floor(mss / 60);
    const seconds = Math.ceil(mss % 60);
    return `${minutes <= 9 ? '0' : ''}${Math.floor(minutes)}:${seconds <= 9 ? '0' : ''}${seconds}`;
}

export function timeFn(dateDiff: any) {
    // di作为一个变量传进来
    const dayDiff = Math.floor(dateDiff / (24 * 3600)); // 计算出相差天数
    const leave1 = dateDiff % (24 * 3600); // 计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / 3600); // 计算出小时数
    // 计算相差分钟数
    const leave2 = leave1 % 3600; // 计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / 60); // 计算相差分钟数
    // 计算相差秒数
    const leave3 = leave2 % 60; // 计算分钟数后剩余的毫秒数
    const seconds = Math.round(leave3);
    const timeDayTxt = `${dayDiff > 0 ? dayDiff + '天' : ''}`;
    return (
        timeDayTxt +
        `${hours > 9 ? hours : '0' + hours}` +
        ':' +
        `${minutes > 9 ? minutes : '0' + minutes}` +
        ':' +
        `${seconds > 9 ? seconds : '0' + seconds}`
    );
}

// 格式化时间
export function formatTime2(mss: any) {
    const hour = Math.floor(mss / 3600);
    const minutes = Math.floor((mss / 60) % 60);
    const seconds = Math.ceil(mss % 60);
    return `${hour <= 9 ? '0' : ''}${hour}:${minutes <= 9 ? '0' : ''}${Math.floor(minutes)}:${
        seconds <= 9 ? '0' : ''
    }${seconds}`;
}
