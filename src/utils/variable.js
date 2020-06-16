import pkg from '../../package.json';

export const defaultThemeColor = '#00d8c9';
export const themeColor = (pkg.themeConfig && pkg.themeConfig.primaryColor) || defaultThemeColor;
export const grayColor = '#333';
export const bgColor = '#797f92';
