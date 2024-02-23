import { DOMEvent } from 'sunny-js';
import { isBrowser } from '@/utils/detect';

export function errorHandler(error: Error) {
  if ('code' in error && isBrowser()) {
    DOMEvent.trigger(`${error.constructor.name}/code/${(error as any).code}`, error);
  }
}
// 把特定的异常报错替换成用户可以接受的报错信息
const abnormalErrors = ['Acceptable', 'Failed', '发生了SSL错误', 'Forbidden'];
const replaceMessage = '网络异常,请您稍后重试';
const defalutMessage = '系统异常，请稍后重试或联系客服';
export function replaceErrorMessage(message: string) {
  let isNeedReplace = false;
  abnormalErrors.forEach((item) => {
    if ((message || '').toLowerCase().indexOf(item.toLowerCase()) !== -1) {
      isNeedReplace = true;
    }
  });
  return isNeedReplace ? replaceMessage : message || defalutMessage;
}
