## Velir Front-End Starter - Vite
Version 6.0.1

_Last Updated: 12/18/2023_

The Gulp version can be found here
https://github.com/Velir/frontend-starter/tree/GulpBuild


## Prerequisites

- NodeJS - v18
- NPM
- Visual Studio Code (optional)


### Installing

1. run:

```bash

$ npm install

```
### CI/CD
The starter generates a license file for third party software automatically. While this is a great feature to have during development it could cause issues in CI/CD pipelines, for that reason its recommended you run the `ci` command with the `--ignore-scripts` flag this will prevent the creation of this file on the server.
```bash
$ npm ci --ignore-scripts
$ npm build-prod
```

### Running

To run the starter, run the following:

```bash
#start the dev server and storybook
$ npm start
```

To run the dev server, proxy server and Storybook. You can also run each individually

```bash

# Start dev server
$ npm run dev

# Start proxy server
$ npm run dev-proxy

# Start Storybook
$ npm run storybook

```

To build the project, run:

```Bash

$ npm run build

```

#### Available Commands

```bash
$ npm start
$ npm run build
$ npm run build-storybook
$ npm run build-typescript
$ npm run dev
$ npm run dev-proxy
$ npm run fresh-install
$ npm run lint
$ npm run scaffold
$ npm run storybook
$ npm run test
$ npm run test-ui
$ npm run test-storybook
$ npm run transform-tokens

```
### Upgrading Storybook

Storybook is frequently adding patches and features. In order to run the storybook `upgrade` command you need to add the `VITE_SITE` environment variable to the command to avoid errors.
```bash
$ VITE_SITE=frontend npx storybook@latest upgrade  
```

### Starter Features

- Vite dev server
- Storybook 7
- ESLint + StyleLint presets
- Vitest unit testing
- BrowserSync Proxy


In development:
- Design Token Parsing with Style Dictionary

## Configuring the Starter
- All of the starter configuration is located in the `package.json`.
- Each site within a project should have its own sitesconfig configuration object.
- It is expected that all files for a multi-site implementations be located in the root of the project in their respective directories and the site object would use that key to reference that site.
- The following example is the default site named "frontend":

```json
"sitesconfig": {
    "frontend": {
      "base": "",
      "outputDir": "../dist",
      "clientDir": "frontend/",
      "aliases": {
        "@": "./frontend",
        "@/.storybook": "./.storybook/",
      },
      "storybook": {
        "staticDirs": [
          "../frontend/assets"
        ],
        "storiesDir": [
          "../frontend/js/**/*.mdx",
          "../frontend/js/**/*.stories.@(js|jsx|ts|tsx)"
        ]
      },
      "proxy": {
        "url": "https://www.velir.com/",
        "build": "dist",
        "route": "",
        "https": true
       }
    }
  }
```
## Aliases
Any aliases added to the sites config object will need to be added to the tsconfig/jsconfig file. Alias are not required in order to use the starter and may not make sense in all cases. Some aliases are used in Storybook confuration that should now be changed, it is best to leave the defaults in place and simply use relative paths if that is preferred.

```json
// tsconfig.json | jsconfig.json
    "paths": {
      "@/*": [
        "./frontend/*",
      ],
      "@/.storybook/*": [
        "./.storybook/*",
      ]
    }
```
When using aliases it is best to be as specific as possible to avoid including code that is not required. For example:

```JS
/* DO NOT */
import { Header } from "@/js/components";

/* DO */
import Header from "@/js/components/Header"
```

## Multi-site configuration
Any object with in the sitesconfig will be a standalone site, each site will require its own npm scripts.
To run a site in a multi-site project you will need to add NPM scripts for the site in `package.json`

```json
    "build": "cross-env VITE_SITE=frontend vite build",
    "dev": "cross-env VITE_SITE=frontend vite",
    "subsite:build": "cross-env VITE_SITE=frontend-subsite vite build",
    "subsite:dev": "cross-env VITE_SITE=frontend-subsite vite",
```

## Working With the Starter
The starter uses the Velirs familiar project structure. All frontend files are located in `./frontend`. The Javascript code is configured to dynamically import components that are used on the page automatically, this gives you a head start when starting a new project and will help site perfomance and transitioning to different developers.

### Component Structure
Each component will have need a couple of files to work in the existing project architecture. below is an example of a component that uses React to render.

```bash
# frontend/js/components/ExampleComponent/

example-component.scss
ExampleComponent.{tsx,jsx}
ExampleComponent.stories.{tsx,jsx}
ExampleComponent.render.{tsx,jsx}
ExampleComponent.mockData.{ts,js}
ExampleComponent.proptypes.{ts,js}


```
- The project is setup to chunk css, this means that the scss file should be imported into the component javascript, alternatively you can turn off the css code splitting feature and import all component styles into the index.scss file, though this will have a negative effect on performance.

- Story files can be located within the component or in a dedicated story directory, this is configurable via the Scaffold CLI.

- Proptypes and defaultProps should be added as named exports in the components `.propTypes.{ts,js}` file.

- The starter storybook utilities that automatically setup story controls based on args in a components `.mockData.{ts,js}` file.

```javascript

import { ExampleComponent, mockData } from "@/js/components/Component";
import { setArgTypes, setArgs } from "@/.storybook/helpers";

export default {
  title: "Base/ExampleComponent",
  component: ExampleComponent,
  argTypes: setArgTypes(mockData),
};

export const exampleComponent = (args) => <ExampleComponent {...setArgs(args)} />;
exampleComponent.args = mockData;

```

`setArgs` converts the mockData values into values the component expects.

`setArgTypes` creates an argType object with readable values and options.



### Dynamic Rendering
In order to work with the dynamicRenderer the `.render.{tsx,jsx}` file is required.

The dynamicRender function takes an array of component objects as an argument and adds them to the render list. You can add components to the renderer this way or add them to the `componentList.{js,ts}` file.

_Note: Using the Scaffold CLI will ensure propper file structure and naming._

```Javascript
/* frontend/js/utils/componentList.ts */

export default [
    {
        selector: ["#root"],
        name: "components/App/App.render.jsx"
    },
    {
        selector: ".js-youtube-video-mount",
        name: "components/YoutTube/YouTube.render.jsx",
    },
];

```
Each component item in the array needs a `selector` and a `name`. The selector is a string or array of selectors to initialize the component. add the component name i.e. ExampleComponent as the `name` value and the `selector` to initialize/mount the component. For example:

``` Javascript
/* index.{js,ts} */

...

dynamicRenderer([
  { selector: ".js-icon", name: "components/Icon/Icon.render.jsx" }
]);

```

### Component Render File

The dynamic renderer expects the component render file to have a default export that can be used to initialize the component. In the case of a react component this would look something like this

```Javascript
/*
* parseArgs used to pars stringified json from server
*/

import ReactDOM from "react-dom/client";
import parseArgs from "@/js/utils/parseArgs";

export default (mount) => {
  ReactDOM.createRoot(mount).render(
    <VideoModal {...parseArgs(mount.dataset)} />
  );
};

```

The mount being passed as an argument comes from the selector in the component list. `parseArgs` is a utility function included with the starter to convert stringified options in the mount node to props.

### Scaffold
See [readme](./tools/scaffold/readme.md) for scaffold commands and features

### Testing

This repo is set up to allow you write tests either for a runner or for storybook. Testing uses Jest and storybook's testing library.

- Test runner is using the storybook's ... test runner to work with command line.
- Vitest/Jest builtin


```JS
export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
  play: HeaderTestExample,
};
```

### Optional and experimental features

#### BrowserSync with Vite server
There may be cases where you want to run a proxied view of a site and use hot module reloading for this it is recommended you run a plugin named [vite-plugin-browser-sync](https://github.com/Applelo/vite-plugin-browser-sync), you can set this sort of behavior up in Vite itself but [BrowserSync](https://browsersync.io/) adds some additional features.

Example config:


```javascript
      VitePluginBrowserSync({
        bs: {
          https: proxy.https || true,
          rewriteRules: [
            {
              match: "</body>",
              fn: function (req, res, match) {
                return `<script type="module">
                import RefreshRuntime from 'http://localhost:5173/@react-refresh'
                RefreshRuntime.injectIntoGlobalHook(window)
                window.$RefreshReg$ = () => {}
                window.$RefreshSig$ = () => (type) => type
                window.__vite_plugin_react_preamble_installed__ = true
              </script>
              <script type="module" src="http://localhost:5173/@vite/client"></script>
              </body>`;
              },
            },
            {
              //remove lib generated
              match:
                '<script src="/assets/VelirSite-build/js/libraries-generated.js?hash=9adc699533b139ac7ceeb85c2e427ba5e066542cf1cbc85ef28a979412d69ea6"></script>',
              fn: function (req, res, match) {
                return "";
              },
            },
            {
              //replace css with scss
              match:
                '<link href="/assets/VelirSite-build/css/index-generated.css?hash=9adc699533b139ac7ceeb85c2e427ba5e066542cf1cbc85ef28a979412d69ea6" media="all" rel="stylesheet" />',
              fn: function (req, res, match) {
                return '<script type="module" src="http://localhost:5173/scss/index.scss"></script>';
              },
            },
            {
              // remove index generated add client and js
              match:
                '<script src="/assets/VelirSite-build/js/index-generated.js?hash=9adc699533b139ac7ceeb85c2e427ba5e066542cf1cbc85ef28a979412d69ea6"></script>',
              fn: function (req, res, match) {
                return '<script type="module" src="http://localhost:5173/js/index.js"></script>';
              },
            },
          ],
          proxy: {
            target: proxy.url,
            ws: true,
          },
          notify: false,
        },
      }),
```
In the example above we are running Vite Browser Sync on a site that uses the gulp starter. First we inject the scripts needed by Vite before the closing `body` tag.

#### PostCSS JIT Props
  Only ship the props you use with [PostCSS JIT Props](https://github.com/GoogleChromeLabs/postcss-jit-props), useful when working with [Open Props](https://open-props.style/) or css prop exported from Figma.

Example config:

```js
//postcss.config.cjs
const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');

module.exports = {
  plugins: [
    postcssJitProps(OpenProps),
  ]
}
```

#### PostCSS Extract Media Query
Concatenate all css to a single file or using a css framework? Extracting media queries to separate files can improve performance. The starter ships with a version of the [PostCSS Extract Media Query Plugin](https://github.com/SassNinja/postcss-extract-media-query) to split media queries into separate stylesheets. More info on why we are including this locally [here](https://github.com/SassNinja/postcss-extract-media-query/pull/41).

Example config:

```js

module.exports = (ctx) => {
  return {
    plugins: {
      "postcss-preset-env": {},
      "postcss-extract-media-query": {
        extractAll: false,
        output: {
          path: path.join(__dirname, "dist/css/chunks/"),
          name: "/[name]/[name]-[query]-generated.css",
        },
        queries: {
          "screen and (max-width: 399px)": "xs",
          "screen and (max-width: 799px)": "sm-max",
          "screen and (min-width: 400px)": "sm-min",
          "screen and (min-width: 400px) and (max-width: 799px)": "sm",
          "screen and (max-width: 1199px)": "md-max",
          "screen and (min-width: 800px)": "md-min",
          "screen and (min-width: 800px) and (max-width: 1199px)": "md",
          "screen and (max-width: 1599px)": "lg-max",
          "screen and (min-width: 1200px)": "lg-min",
          "screen and (min-width: 1200px) and (max-width: 1599px)": "lg",
          "screen and (max-width: 1919px)": "xl-max",
          "screen and (min-width: 1600px)": "xl-min",
          "screen and (min-width: 1600px) and (max-width: 1919px)": "xl",
          "screen and (min-width: 1920px)": "xxl-min",
          print: "print",
        },
        config: {
          plugins: {
            /* since the extraction into new files breaks
             * the pipe we need to run any plugins that happen
             * after the extract plugin runs
             * */
            ...(ctx.env === "production"
              ? {
                  cssnano: { preset: "advanced" },
                }
              : {
                  "postcss-preset-env": {},
                }),
          },
        },
      }
    },
  };
};

```



#### Helpful links

- https://storybook.js.org/docs/react/essentials/interactions
- https://storybook.js.org/docs/react/api/csf
- https://jestjs.io/


