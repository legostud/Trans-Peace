import { addons } from '@storybook/manager-api';
import theme from "./theme";

let currentTheme = theme.light;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currentTheme = theme.dark;
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = theme.dark;
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = theme.light;
        }
    }
    location.reload();
});

addons.setConfig({
    theme: { ...currentTheme },
});