import dayjs from 'dayjs';

/**
 * @param  {string} format='YYYY-MM-DD'
 * 获取当前时间,默认按年月日返回
 */
export function momentGetNow(format = 'YYYY-MM-DD') {
  return dayjs().format(format);
}
