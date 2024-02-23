/**
 * 构造函数支持传入的数据类型
 */
type MomentInput = Moment | Date | string | number;

/**
 * 时间单位
 */
type TimeUnit =
  | 'year'
  | 'years'
  | 'y'
  | 'month'
  | 'months'
  | 'M'
  | 'week'
  | 'weeks'
  | 'w'
  | 'day'
  | 'days'
  | 'd'
  | 'hour'
  | 'hours'
  | 'h'
  | 'minute'
  | 'minutes'
  | 'm'
  | 'second'
  | 'seconds'
  | 's'
  | 'millisecond'
  | 'milliseconds'
  | 'ms';

/**
 * 时间选项接口
 */
interface Option {
  Y: number; // 年
  M: number; // 月
  D: number; // 日
  H: number; // 时
  m: number; // 分
  s: number; // 秒
  S: number; // 毫秒
}

/**
 * moment解析函数
 * @param input 传入的数据类型
 * @param _inputFormat 格式化字符串
 */
function moment(input?: MomentInput, _inputFormat?: string): Moment {
  // 定义局部变量date
  let date = new Date();

  // 判断输入是否实现Moment接口
  const isMoment = (props: any): props is Moment => {
    return typeof (props as Moment).format === 'function';
  };

  // 输入判断
  if (input || input === 0 || input === '') {
    // 通过date类型构造moment
    if (input instanceof Date) {
      date = input;
    } else if (typeof input === 'string' || typeof input === 'number') {
      // 通过string,number类型构造moment
      try {
        if (typeof input === 'string') {
          date = new Date(input.replace(/[-\.]/g, '/'));
        } else {
          date = new Date(input);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (isMoment(input)) {
      // 通过MomentInput构造moment
      date = new Date(input.valueOf());
    }
  }

  /**
   * 获取时间选项
   * @param value 时间
   */
  const getOption = (value: Date): Option => {
    return {
      Y: value.getFullYear(),
      M: value.getMonth() + 1,
      D: value.getDate(),
      H: value.getHours(),
      m: value.getMinutes(),
      s: value.getSeconds(),
      S: value.getMilliseconds(),
    };
  };

  /**
   * 格式化渲染时间选项
   * @param option 时间选项
   * @param formatString 时间格式化字符串
   */
  const renderFormatString = (option: Option, formatString: string): string => {
    // 特殊处理llll日期格式
    if (formatString === 'llll') {
      formatString = 'YYYY年M月D日 HH:mm';
    }

    return formatString.replace(/(Y+|M+|D+|H+|m+|s+|S)/g, (v) => {
      switch (v[0]) {
        // 年份
        case 'Y':
          return option.Y.toString().slice(-v.length);
        // 月，日，时，分，秒
        case 'M':
        case 'D':
        case 'H':
        case 'm':
        case 's':
          return (
            // @ts-ignore
            ((v.length === 2 ? '0' : '') + option[v.slice(-1)].toString().slice(-v.length)).slice(
              -2,
            )
          );
        // 毫秒
        case 'S':
          return ('00' + option.S.toString()).slice(-3);
        default:
          return v;
      }
    });
  };

  /**
   * 获取毫秒数
   */
  const valueOf = (): number => {
    return date.getTime();
  };

  /**
   * 格式化输入当前moment
   * @param formatString 格式化字符串
   */
  const format = (formatString: string): string => {
    const option = getOption(date);
    return renderFormatString(option, formatString);
  };

  /**
   * 返回值
   */
  const result: Moment = {
    valueOf,

    format,

    diff: (another: MomentInput): number => {
      // 构造另一个moment对象
      const anotherMoment = moment(another);
      // 默认只进行毫秒比较
      return valueOf() - anotherMoment.valueOf();
    },

    startOf: (unitOfTime: TimeUnit): Moment => {
      switch (unitOfTime) {
        case 'days':
        case 'day':
        case 'd':
          date.setHours(0, 0, 0, 0);
          break;
        case 'months':
        case 'month':
        case 'M':
          date = new Date(new Date(date.setHours(0, 0, 0, 0)).setDate(1));
          break;
      }

      return result;
    },

    isSame: (targetDate: MomentInput, unitOfTime?: TimeUnit): boolean => {
      const targetDateObj = new Date(targetDate.valueOf());
      switch (unitOfTime) {
        case 'days':
        case 'day':
        case 'd':
          return (
            date.getFullYear() === targetDateObj.getFullYear() &&
            date.getMonth() === targetDateObj.getMonth() &&
            date.getDate() === targetDateObj.getDate()
          );
      }
      return false;
    },

    add: (amount: number, unitOfTime?: TimeUnit): Moment => {
      switch (unitOfTime) {
        case 'months':
        case 'month':
        case 'M':
          date.setMonth(date.getMonth() + amount);
          break;
        case 'days':
        case 'day':
        case 'd':
          date = new Date(date.getTime() + 1000 * 60 * 60 * 24 * amount);
          break;
        case 'milliseconds':
        case 'millisecond':
        case 'ms':
          date = new Date(date.getTime() + amount);
          break;
      }
      return result;
    },

    subtract: (amount: number, unitOfTime?: TimeUnit): Moment => {
      switch (unitOfTime) {
        case 'years':
        case 'year':
        case 'y':
          date.setFullYear(date.getFullYear() - amount);
          break;
        case 'months':
        case 'month':
        case 'M':
          date.setMonth(date.getMonth() - amount);
          break;
        case 'days':
        case 'day':
        case 'd':
          date = new Date(date.getTime() - 1000 * 60 * 60 * 24 * amount);
          break;
      }
      return result;
    },

    endOf: (unitOfTime: TimeUnit): Moment => {
      switch (unitOfTime) {
        case 'days':
        case 'day':
        case 'd':
          date.setHours(23, 59, 59, 999);
      }

      return result;
    },

    isBefore: (targetDate: MomentInput, unitOfTime?: TimeUnit): boolean => {
      switch (unitOfTime) {
        case 'days':
        case 'day':
        case 'd':
          return format('YYYYMMDD') < moment(targetDate).format('YYYYMMDD');

        default:
          return date.getTime() < moment(targetDate).valueOf();
      }
    },

    isAfter: (targetDate: MomentInput, unitOfTime?: TimeUnit): boolean => {
      switch (unitOfTime) {
        case 'days':
        case 'day':
        case 'd':
          return format('YYYYMMDD') > moment(targetDate).format('YYYYMMDD');

        default:
          return date.getTime() > moment(targetDate).valueOf();
      }
    },

    toDate: () => {
      return date;
    },
  };

  return result;
}

/**
 * Moment接口
 */
interface Moment extends Object {
  /**
   * 返回毫秒数
   */
  valueOf(): number;

  // 格式化字符串
  format(format?: string): string;

  // 比较时间差
  diff(targetDate: MomentInput, unitOfTime?: TimeUnit): number;

  // 返回开始的时间点
  startOf(unitOfTime: TimeUnit): Moment;

  // 判断时间维度是否相等
  isSame(targetDate: MomentInput, unitOfTime?: TimeUnit): boolean;

  // 增加时间维度
  add(amount?: number, unitOfTime?: TimeUnit): Moment;

  // 减去时间维度
  subtract(amount?: number, unitOfTime?: TimeUnit): Moment;

  // 返回结束的时间点
  endOf(unitOfTime: TimeUnit): Moment;

  // 比某时间维度早
  isBefore(targetDate: MomentInput, unitOfTime?: TimeUnit): boolean;

  // 比某时间维度晚
  isAfter(targetDate: MomentInput, unitOfTime?: TimeUnit): boolean;

  // 转化成日期
  toDate(): Date;
}

/**
 * 导出moment
 */
export default moment;

/**
 * 计算时间段
 * @param input 毫秒数
 * @param unitOfTime 时间单位，默认为毫秒
 */
export function duration(input: number) {
  return ((value: number) => {
    let valueLeft = value;
    // 计算days
    const days = Math.floor(valueLeft / (1000 * 60 * 60 * 24));
    valueLeft -= 1000 * 60 * 60 * 24 * days;
    // 计算hours
    const hours = Math.floor(valueLeft / (1000 * 60 * 60));
    valueLeft -= 1000 * 60 * 60 * hours;
    // 计算minutes
    const minutes = Math.floor(valueLeft / (1000 * 60));
    valueLeft -= 1000 * 60 * minutes;
    // 计算seconds
    const seconds = Math.floor(valueLeft / 1000);
    valueLeft -= 1000 * seconds;
    return {
      days: () => days,
      hours: () => hours,
      minutes: () => minutes,
      seconds: () => seconds,
    };
  })(input);
}
