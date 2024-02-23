export function isBrowser() {
  try {
    return 'location' in window;
  } catch (e) {
    return false;
  }
}
export function isCookieEnabled() {
  try {
    return (
      typeof window !== 'undefined' &&
      window.navigator.cookieEnabled &&
      typeof window.localStorage !== 'undefined'
    );
  } catch (e) {
    return true;
  }
}
