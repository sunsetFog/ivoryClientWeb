import DOMPurify from 'dompurify';

/**
 * TODO 增加过滤可能引起xss攻击的敏感信息
 * @param contents
 */
export function fixedXssContent(contents: any) {
    if (typeof DOMPurify.sanitize !== 'function') {
        return contents;
    }
    return DOMPurify.sanitize(contents);
}
