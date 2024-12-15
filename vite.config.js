import { resolve } from "path";
import { loadEnv, splitVendorChunkPlugin, normalizePath } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import chalk from "chalk";
import { sitesconfig } from "./package.json";
import sassGlobImports from "vite-plugin-sass-glob-import";
import { svgSprite } from "./plugins/svgSprite.js";
import formatAliases from "./plugins/formatAliases.js";
import { configureProxy } from "./plugins/configureProxy";
import VitePluginBrowserSync from "vite-plugin-browser-sync";

export default ({ command, mode, ssrBuild }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  console.log(chalk.blue("Welcome to", process.env.NODE_ENV, "Mode"));
  const env = process.env.NODE_ENV;
  const { VITE_SITE } = loadEnv(mode, process.cwd(), "");

  if (!sitesconfig[VITE_SITE]) {
    throw new Error(`Missing sites configuration for ${VITE_SITE}`);
  }
  const { base, outputDir, clientDir, aliases, proxy } = sitesconfig[VITE_SITE];
  const frontendDir = normalizePath(resolve(__dirname, clientDir));
  const svgSpriteFilename = "svg-sprite.svg";

  return defineConfig({
    plugins: [
      //configureProxy takes proxy object and optionally files to proxy.
      //by default it is configured to replace any link or script tag with the local source file
      //pathToSource: string,
      //proxy: { url: string, https: boolean },
      //files?: { regex: RegExp, replace: string }[],
      VitePluginBrowserSync(configureProxy({ proxy })),
      sassGlobImports(),
      svgSprite({
        src: `${frontendDir}/assets/img/icons`,
        dest: `${frontendDir}/public/assets/img`,
        filename: svgSpriteFilename,
      }),
      react({
        babel: {
          babelrc: false,
        },
      }),
      splitVendorChunkPlugin(),
    ],
    publicDir: `${frontendDir}/public/`,
    root: frontendDir,
    base:
      command === "serve" && mode === "development" ? "" : normalizePath(base),
    build: {
      outDir: normalizePath(outputDir),
      emptyOutDir: false, //false for extracting media queries
      manifest: true,
      minify: env === "production" ? true : false,
      reportCompressedSize: true,
      sourcemap: env === "production" ? false : "inline",
      rollupOptions: {
        input: {
          index: `${frontendDir}/js/index.js`,
          styles: `${frontendDir}/scss/index.scss`,
          svg: `${frontendDir}/assets/img/svg-sprite.svg`,
        },
        output: {
          chunkFileNames: "js/chunks/[name]-[hash].js",
          entryFileNames: "js/[name]-generated.js",
          assetFileNames: ({ name }) => {
            if (/\.(woff|woff2|ttf|otf)$/.test(name ?? "")) {
              return "assets/fonts/[name][extname]";
            }
            if (
              /\.(gif|jpe?g|png|svg)$/.test(name ?? "") &&
              name === svgSpriteFilename
            ) {
              return "assets/images/[name][extname]";
            }
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.css$/.test(name ?? "") && name === "index.css") {
              return "css/[name]-generated[extname]";
            } else if (/\.css$/.test(name ?? "")) {
              return "css/chunks/[name]/[name]-generated[extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
    },
    resolve: {
      alias: formatAliases(aliases),
    },
    css: {
      transformer: { type: "postcss" },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/scss/_import.scss";',
        },
      },
    },
    esbuild: {
      jsxInject: "import React from 'react';",
    },
    test: {
      global: true,
      environment: "jsdom",
      coverage: { enabled: true, reporter: ["text", "json", "html"] },
    },
    /*PLOP_INJECT_VITE_*/
  });
};
