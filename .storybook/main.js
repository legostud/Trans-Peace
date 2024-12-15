 import { sitesconfig } from "../package.json";
   
const { VITE_SITE } = process.env;
const siteName = VITE_SITE || "frontend";
const { storybook} = sitesconfig[siteName];
const config = {
  stories: [...storybook?.storiesDir],
  addons: [
    "@whitespace/storybook-addon-html",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-outline",
    "@storybook/addon-measure",
    "@storybook/addon-a11y",
],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  staticDirs:  storybook?.staticDirs,
 };

export default config;

 