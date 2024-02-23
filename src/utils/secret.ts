import CryptoJS from 'crypto-js';

/****
 * 域名缓存加密
 */

const key = CryptoJS.enc.Utf8.parse('N2841A3412APCD6F'); // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('AUCDTF12H41P34Y2'); // 十六位十六进制数作为密钥偏移量

// 解密方法
const Decrypt = (word: any) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

// 加密方法
const Encrypt = (word: any) => {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
};

/** 存入本地*/
const setToken = (ikey: any, stringVal: any) => {
  try {
    if (!localStorage) {
      return false;
    }
    const tem = (new Date() as any) - 1; // 当前的时间
    const ZeroTime = new Date(new Date().toLocaleDateString()).getTime(); // 今天0点的时间戳
    const time = ZeroTime + 22 * 60 * 60 * 1000; // 晚上十点的时间戳
    let cacheExpireDate;
    if (time > tem) {
      // 当前的时间戳大于过期的 时间戳
      cacheExpireDate = time;
    } else {
      cacheExpireDate = time + 24 * 60 * 60 * 1000; // 过期时间
    }
    const cacheVal = { val: stringVal, exp: cacheExpireDate };
    localStorage.setItem(Encrypt(ikey), Encrypt(JSON.stringify(cacheVal))); // 存入缓存值
    // console.log(ikey + ':存入缓存，' + new Date(cacheExpireDate) + '到期');
  } catch (e) {
    console.log(e);
  }
};

const getToken = (ikey: any) => {
  // 取
  try {
    if (!localStorage) {
      return false;
    }
    const cacheVal = localStorage.getItem(Encrypt(ikey));
    const result = JSON.parse(Decrypt(cacheVal));
    const now = (new Date() as any) - 1; // 当前时间搓
    if (!result) {
      return null;
    } // 缓存不存在 本地时间
    if (now > result.exp) {
      // 缓存过期
      console.log(Encrypt(ikey));
      removelocalStorage(Encrypt(ikey));
      return '';
    }
    return result.val;
  } catch (e) {
    removelocalStorage(ikey);
    return null;
  }
};

/**移除缓存，一般情况不手动调用，缓存过期自动调用*/
const removelocalStorage = (ikey: any) => {
  if (!localStorage) {
    return false;
  }
  localStorage.removeItem(ikey);
};

export default {
  setToken,
  getToken,
};
