// @ts-nocheck
//  用户名验证
export const USERNAME_REG = /^[0-9a-zA-Z]{6,16}$/;
export const getUserNameRule = (message = '请输入6-16位用户名') => ({
    required: true,
    pattern: USERNAME_REG,
    message
});

//  别名验证
export const EBpayNAME_REG = /^[0-9a-zA-Z\u4e00-\u9fa5]{1,12}$/;
export const getEBpayNameRule = (message = '请正确输入别名，最大不超过12个字符') => ({
    required: true,
    pattern: EBpayNAME_REG,
    message
});

// 手机号
export const PHONE_REG = /^1[0-9]{10}$/;
export const getPhoneRule = (message = '请输入正确手机号') => ({
    required: true,
    pattern: PHONE_REG,
    message
});

// ebpay地址 校验
export const EBPAY_REG = /^eb[0-9a-zA-Z]{32}$/;
export const getEBpayRule = (message = '请输入正确的34位以eb开头的EBpay地址') => ({
    require: true,
    pattern: EBPAY_REG,
    message
});
// koipay地址 校验
export const KOIPAY_REG = /^kb[0-9a-zA-Z]{32}$/;
export const getKOIpayRule = (message = '请输入正确的34位以kb开头的KOIpay地址') => ({
    require: true,
    pattern: KOIPAY_REG,
    message
});
// 密码
export const PASSWORD_REG = /^[0-9a-zA-Z]{6,16}$/;
export const getPasswordRule = (message = '请输入6-16位字母或数字的密码') => ({
    required: true,
    pattern: PASSWORD_REG,
    message
});
export const getRePasswordRule = (message = '请再次输入6-16位字母或数字的密码') => ({
    required: true,
    pattern: PASSWORD_REG,
    message
});

// 金额验证 大于0的正数
export const POSITIVE_INTEGER_REG = /^[1-9]\d*$/;
export const getPositiveIntegerRule = (message = '请输入大于0的整数') => ({
    required: true,
    pattern: POSITIVE_INTEGER_REG,
    message
});

export const getCountRangeRule = ({min, max}, message = '金额') => ({
    validator: (_rule, value, callback) => {
        if (value) {
            if (Number(value) < min) {
                return callback(`单笔最小${message}: ${min}`);
            }
            if (Number(value) > max) {
                return callback(`单笔最大${message}: ${max}`);
            }
            return callback();
        }
        return callback(`请输入${message}`);
    }
});

// 金额 小数限制
export const precisionLimit = (label: string, limit: number) => ({
    validator: (_rule, value: string, callback) => {
        if (value) {
            if (String(value).split('.')[1]?.length > limit) {
                return callback(`${label}最多支持${limit}位小数`);
            }
            return callback();
        }
        return callback(`请输入${label}`);
    }
});

// 验证码
export const CODE_REG = /^[a-zA-z0-9]{4,6}$/;
export const getCodeRule = (message = '请输入正确验证码') => ({
    required: true,
    pattern: CODE_REG,
    message
});

// 银行卡 https://pay.weixin.qq.com/wiki/doc/api/xiaowei.php?chapter=22_1
export const BANK_CODE = /^[1-9]\d{9,19}$/;
export const getBankCodeRule = (message = '请输入正确的银行卡号') => ({
    required: true,
    pattern: BANK_CODE,
    message
});

// 邮箱
export const EMAIL_REG = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
export const getEmailRule = (message = '请输入正确的email') => ({
    required: true,
    pattern: EMAIL_REG,
    message
});

// QQ号码
export const QQ_REG = /^[1-9][0-9]{4,10}$/;
export const getQQRule = (message = '请输入正确的QQ号码') => ({
    required: true,
    pattern: QQ_REG,
    message
});

// 中文
export const REAL_NAME = /^[a-zA-Z\u4e00-\u9fa5·]{0,20}$/;
export const REAL_NAME_DOT = /^(?![·\-_\s])(?!.*[·\-_\s]$)/; // 首尾不包含点、中线、下划线
export const REAL_NAME_REPEAT = new RegExp('[·_-]{2,}'); // 包含 连续2个或已上的点，中线，下划线
export const REAL_NAME_SPECIAL = new RegExp( // 特殊字符
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]"
);
export const getRealName = (message = '存款人姓名') => ({
    validator: (_rule: any, value: any) => {
        if (!value) {
            return Promise.reject(`请输入${message}`);
        }
        if (!REAL_NAME.test(value) || !REAL_NAME_DOT.test(value)) {
            return Promise.reject(`请输入正确的${message}，支持“·”，字数不超过20个`);
        }
        return Promise.resolve();
    }
});

// 检查用户名返回错误
export const checkRealName = (value: any, message = '存款人姓名') => {
    if (!value) {
        return `请输入${message}`;
    }
    if (!REAL_NAME.test(value) || !REAL_NAME_DOT.test(value) || REAL_NAME_REPEAT.test(value)) {
        return `请输入正确的${message}，支持“·”，字数不超过20个`;
    }
};

// 正则
export const getPattern = {
    areaCode: /^\d+$/,
    fixedPhone: /^\d+$/,
    alphabetOrNumber: /^[A-Za-z0-9]+$/,
    characterOrNumber: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
    // userName: /^[A-Za-z0-9\u4e00-\u9fa5]*[A-Za-z0-9]*$/,
    floatNumber: /^\d+(\.\d+)?$/,
    // 正数
    positiveNumber: /^([1-9]+(\.\d+)?)|(0\.\d+)$/,
    // 两位小数的正则
    TwoDecimalsNumber: /^([1-9]\d*(\.\d{1,2})?|0\.[1-9][0-9]?|0\.[0-9][1-9])$/,

    // 会员等级名称
    memberLevelName: /^([\u4e00-\u9fa5]{1,8}|[A-Za-z]{1,20})$/,
    // 整数;
    number: /^0|([1-9]\d*)$/,
    // 正整数
    positiveInteger: /^[1-9]\d*$/,
    // 1到90的正整数（天数限制）
    oneToNinety: /^[1-8][0-9]?$|^90$|^9$/,
    // 1 到 9999, 最大积分限制
    maxPoints: /^[1-9]\d{0,3}$/,
    // 1 到 99999, 最大积分限制
    maxPointsPlus: /^[1-9]\d{0,4}$/,
    // 消费的最大金额
    expenseMaxMoney: /^[1-9]\d{0,5}$/,
    // 固定电话正则:
    fixedNumber: /^\d{3,4}\-\d+(\-\d+)?$/,
    // 会员卡升降级条件
    memberMaxPrice: /^[1-9]\d{0,7}$/,
    // 限制营业额指标 0-100000000;
    limitAmountTarget: /^[1-9]\d{0,8}$|^100000000$|^0$/,
    // 最大金额0-99999.99
    maxMoneyLimit: /^(0(?!\.0{1,2}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,4}(\.[0-9]{1,2})?)$/,
    // 判断是否包含两个• 两个空格 或•与空格相邻
    nameContain: /•{2}|\s{2,}|•\s|\s•/,

    // 用户名4-12位数字或字母
    userName: /^[a-zA-Z0-9]{4,12}$/,
    // 密码6-12位数字或密码
    password: /^[a-zA-Z0-9]{6,12}$/,
    // 密码输入限制
    passwordInput: /[^a-zA-Z0-9]/g,
    // 银行卡密码输入限制
    bankPwd: /^\d{6}$/,
    // 真实姓名输入规则：  只允许输入字母 汉字 空格 和 .
    realNameInput:
        /^([\u4E00-\u9FA5]((?!\.\.|\.(●|·)|(●|·)\.|\s\.|\.\s|(●|·)(●|·)|(●|·)\s|\s(●|·)|\s{2,})[\u4E00-\u9FA5(●|·)\.]){0,22}[\u4E00-\u9FA5])|(^[a-zA-Z]((?!\.\.|\.(●|·)|(●|·)\.|\s\.|\.\s|(●|·)(●|·)|(●|·)\s|\s(●|·)|\s{2,})[a-zA-Z\s•\.]){0,22}[a-zA-Z])$/,
    // 手机验证规则：1开头的11位数字
    mobile: /^1\d{10}$/,
    // 亚博的手机号验证规则
    mobileYB: /^0?(13[0-9]|14[5-9]|15[0-9]|16[0-9]|17[0-8]|18[0-9]|19[0-9])[0-9]{8}$/,
    // 真实姓名验证规则：   判断2-24位中文字符长度，
    // 仅允许中文、英文、空格和“•”   中文姓名，不允许出现空格，
    // 允许出现“•” , 空格和“•”不允许出现在第一位和最后一位
    // realName:
    //   /(^[\u4E00-\u9FA5]((?!\.\.|\.•|•\.|\s\.|\.\s|••|•\s|\s•|\s{2,})[\u4E00-\u9FA5•\.]){0,22}[\u4E00-\u9FA5]$)|(^[a-zA-Z]((?!\.\.|\.•|•\.|\s\.|\.\s|••|•\s|\s•|\s{2,})[a-zA-Z\s•\.]){0,22}[a-zA-Z]$)/,
    // 邮箱输入框规则：不许输入中文或者空格 表情
    // realName: /../, // 现在改成后端校验了 前端不需要校验了。

    emailInput: /[\u4E00-\u9FA5]|\s|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,
    // 邮箱验证规则：中间必须包括@符号
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    // 匹配emoji表情正则
    emoji: /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,
    // address 地址校验 不能包含空格 中英文输入
    address: /(?![\u4E00-\u9FA5a-zA-Z•\.\s])./g,
    betaddress: /^[\u4E00-\u9FFF\w\s\*\&\#\+\-\_\@\/\\\\]*$/,
    // 字母数字输入
    numberLetterInput: /[^a-zA-Z0-9]/g,
    // 验证码
    verCode: /^[0-9]{6}$/
};
