
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import { Plugin } from 'vite';
import { mergeDeepRight, flatten } from "ramda";
 
interface ProxyConfigType {
  pathToSource: string,
  proxy: { url: string, https: boolean },
  files?: { match: RegExp, fn: string }[],
}

const defaults: ProxyConfigType = {
  pathToSource: "/",
  proxy: { url: "https://www.velir.com", https: true },
  files: [
    {
      match: /<(link|script)\s+(?:[^>]*?\s+)?(href|src)=(.*)-generated.(js|css)(.*)>/g,
      fn: (_: any, __: any, matches: string) => {
        const tmatch = matches.match(/<(link|script)\s+(?:[^>]*?\s+)?(href|src)=(.*)-generated.(js|css)(.*)>/);
        const sourceFile = tmatch?.[3]?.split("/").pop();
        const type = tmatch?.[4] === "js" ? "js" : "scss";
        console.log('type :>> ', type);
        const testMatches = `<script type="module" src="http://localhost:5173/${type}/${sourceFile}.${type}"></script>`;
        return testMatches;
      },
    },
  ]
}

export const configureProxy = (userConfig: ProxyConfigType) => {
  const settings = mergeDeepRight(defaults, userConfig);
  return {
    dev: {
      bs: {
        https: settings.proxy.https || true,
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
          ...settings.files
        ],
        proxy: {
          target: settings.proxy.url,
          ws: true,
        },
      },
    }
  }
};
