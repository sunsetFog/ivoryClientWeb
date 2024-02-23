// @ts-ignore
let startY = 0;
let enabled = false;
let supportsPassiveOption = false;
try {
    const opts = Object.defineProperty({}, 'passive', {
        get() {
            supportsPassiveOption = true;
        }
    });
    window.addEventListener('test', () => null, opts);
} catch (e) {
    //
}
let handleTouchmove = (evt: any) => {
    let el = evt.target;
    const zoom = window.innerWidth / window.document.documentElement.clientWidth;
    if (evt.touches.length > 1 || zoom !== 1) {
        return;
    }
    while (el !== document.body && el !== document) {
        const style = window.getComputedStyle(el);
        if (!style) {
            break;
        }
        if (el.nodeName === 'INPUT' && el.getAttribute('type') === 'range') {
            return;
        }
        const scrolling = style.getPropertyValue('-webkit-overflow-scrolling');
        const overflowY = style.getPropertyValue('overflow-y');
        const height = parseInt(style.getPropertyValue('height'), 10);
        const isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
        const canScroll = el.scrollHeight > el.offsetHeight;
        if (isScrollable && canScroll) {
            const curY = evt.touches ? evt.touches[0].screenY : evt.screenY;
            const isAtTop = startY <= curY && el.scrollTop === 0;
            const isAtBottom = startY >= curY && el.scrollHeight - el.scrollTop === height;
            if (isAtTop || isAtBottom) {
                evt.preventDefault();
            }
            return;
        }
        el = el.parentNode;
    }
    evt.preventDefault();
};
const handleTouchstart = (evt: any) => {
    startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
};
const enable = () => {
    window.addEventListener('touchstart', handleTouchstart, false);
    window.addEventListener('touchmove', handleTouchmove, false);
    enabled = true;
};
const disable = () => {
    window.removeEventListener('touchstart', handleTouchstart, false);
    window.removeEventListener('touchmove', handleTouchmove, false);
    enabled = false;
};
const isEnabled = () => {
    return enabled;
};
let testDiv = document.createElement('div');
document.documentElement.appendChild(testDiv);
// @ts-ignore
testDiv.style.WebkitOverflowScrolling = 'touch';
let scrollSupport =
    'getComputedStyle' in window &&
    // @ts-ignore
    window.getComputedStyle(testDiv)['-webkit-overflow-scrolling'] === 'touch';
document.documentElement.removeChild(testDiv);
if (scrollSupport) {
    enable();
}
let iNoBounce = {enable, disable, isEnabled};
if (typeof module !== 'undefined' && module.exports) {
    module.exports = iNoBounce;
}
