/**
 * 判断是否为iphone的刘海屏手机
 */
const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent;

export const isIos = () => /iphone/gi.test(ua);

export const isAndroid = () => /(?:Android)/.test(ua);

/**
 * 判断IOS异形屏
 * @returns
 */
export function isIphoneX() {
  var faultTolerantVal = 10; // 容错值
  return (
    /iphone/gi.test(window.navigator.userAgent) && window.screen.height + faultTolerantVal >= 812
  );
}

export function isBangPhone() {
  const standAlone = typeof window === 'undefined' ? '' : (window.navigator as any).standalone;

  const ios = isIos();

  const { width, height } = typeof window === 'undefined' ? ({} as any) : window.screen;
  //  iPhone X、iPhone XS
  const isIPhoneX = ios && ((width === 375 && height === 812) || (width === 812 && height === 375));
  // iPhone XR/XsMAX
  const isIPhoneXSMax =
    ios && ((width === 414 && height === 896) || (width === 896 && height === 414));

  // return !(standAlone && (isIPhoneX || isIPhoneXSMax));
  return standAlone && (isIphoneX() || isIPhoneX || isIPhoneXSMax);
}

// 移动端的Safari刘拉你去
export function isMobileSafari() {
  // IOS系统
  if (!/ OS \d/.test(ua)) {
    return false;
  }
  // 不是Chrome
  // tslint:disable-next-line:no-bitwise
  if (~ua.indexOf('CriOS')) {
    return false;
  }
  // 开头不包含为Mozilla
  if (ua.indexOf('Mozilla')) {
    return false;
  }
  // 结尾需为：Safari/xxx.xx
  if (!/Safari\/[\d\.]+$/.test(ua)) {
    return false;
  }
  if (navigator.vendor !== 'Apple Computer, Inc.') {
    return false;
  }
  return navigator.userAgent.indexOf('FxiOS') === -1;
}

export const getUCBrowser = () => /ucbrowser/gi.test(ua);

/** 打开窗口
 * @param {string} url 跳转地址
 * @param {object} 配置参数
 * {
 *  {string} id div的id
 *  {boolean} isOpen 是否需要打开新页面
 * }
 * */
export function openWindow(url = '', { id = 'download', isOpen = true } = {}) {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  if (isOpen) {
    a.setAttribute('target', '_blank');
  }
  a.setAttribute('id', id);

  try {
    const e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    a.dispatchEvent(e);
  } catch (e) {
    window.open(url);
  }
}

/** 获取当前页面高度
 *  这里有个问题
 *  当页面有键盘时候, 必须使用第一次计算的高度, 否则ios中键盘消失会发生高度塌陷
 **/
export function getClientHeight() {
  return typeof document === 'undefined' ? 0 : document.body.clientHeight;
}
export const clientHeight = getClientHeight();

/**
 *
 * 根据当前浏览器判断手机系统
 * @export
 * @returns string
 */
export function isTerminal(): string {
  const u = navigator.userAgent;
  const _isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isiOS) {
    return 'ios';
  } else if (_isAndroid) {
    return 'android';
  } else {
    return '';
  }
}
