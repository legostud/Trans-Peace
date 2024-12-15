import { create } from '@storybook/theming/create';
const theme = {
    light: create({
        base: "light",
        brandTitle: "Velir",
        brandImage: "/assets/img/logo.svg",
        brandUrl: "https://github.com/velir/frontend-starter",
    }),
    dark: create({
        base: "dark",
        brandTitle: "Velir",
        brandImage: "/assets/img/logo-dark.svg",
        brandUrl: "https://github.com/velir/frontend-starter",
    })
}
export default theme;