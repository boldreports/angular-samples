
export class NavigationHelper {
  static getHref(platformSlug: string): string {
    const isLocal = !window.location.hostname.includes('boldreports.com');
    return isLocal
        ? (platformSlug === '' ? '/' : `/${platformSlug}.html`)
        : (platformSlug === '' ? '/home/' : `/home/${platformSlug}.html`);
  }
}
