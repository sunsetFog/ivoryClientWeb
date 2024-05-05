export const formatContent = (content) => {
  // 以含有“分割”字符分隔文案块，去除空标签，标签外换行
  if (content) {
    content = content.replace(/<p[^><]*?>[^><]*分割[^><]*?<\/p>/g, '<p>区块文案分割(勿删)</p>');
    content = content.replace(/<p[^><]*?>\s*<\/p>/g, '');
  }
  if (typeof content !== 'string' || !content) {
    return [];
  }
  return content.split('<p>区块文案分割(勿删)</p>');
};

export const formatContentItem = (content) => {
  // “分割”单个Item
  if (typeof content !== 'string' || !content) {
    return [];
  }
  return content.match(/<p[^><]*?>.*?<\/p>/g);
};


import DOMPurify from 'dompurify';

/**
 * 过滤可能引起xss攻击的敏感信息
 * @param contents
 */
export function fixedXssContent(contents) {
  if (typeof (DOMPurify.sanitize) !== 'function') {
    return contents
  }
  return DOMPurify.sanitize(contents);
}
