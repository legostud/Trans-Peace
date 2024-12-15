import { resolve } from "path";
import { loadEnv, splitVendorChunkPlugin } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sitesconfig } from "./package.json";
import sassGlobImports from "vite-plugin-sass-glob-import";
import { svgSprite } from "./plugins/svgSprite.js";
import formatAliases from "./plugins/formatAliases.js";
import chalk from "chalk";

export default ({ command, mode, ssrBuild }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  console.log(chalk.blue("Welcome to", process.env.NODE_ENV, "Mode"));
  const env = process.env.NODE_ENV;
  const { VITE_SITE } = loadEnv(mode, process.cwd(), "");
  if (!sitesconfig[VITE_SITE]) {
    throw new Error(`Missing sites configuration for ${VITE_SITE}`);
  }

  const { base, outputDir, clientDir, aliases } = sitesconfig[VITE_SITE];
  const frontendDir = resolve(__dirname, clientDir);
  const buildDir = resolve(__dirname, outputDir.replace("../", ""));

  return defineConfig({
    plugins: [
      svgSprite({
        src: `${frontendDir}/assets/icons`,
        dest: `${buildDir}/img`,
      }),
      react({
        babel: {
          babelrc: false,
        },
      }),
      splitVendorChunkPlugin(),
      sassGlobImports(),
    ],
    root: frontendDir,
    base: command === "serve" && mode === "development" ? "" : base,
    build: {
      outDir: outputDir,
      emptyOutDir: false, //false for extracting media queries
      manifest: true,
      minify: env === "production" ? true : false,
      reportCompressedSize: true,
      sourcemap: env === "production" ? false : "inline",
      rollupOptions: {
        input: {
          index: `${frontendDir}/js/index.js`,
          styles: `${frontendDir}/scss/index.scss`,
        },
        output: {
          chunkFileNames: "js/chunks/[name]-[hash].js",
          entryFileNames: "js/[name]-generated.js",
          assetFileNames: ({ name }) => {
            if (/\.(woff|woff2|ttf|otf)$/.test(name ?? "")) {
              return "assets/fonts/[name][extname]";
            }
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.css$/.test(name ?? "") && name === "styles.css") {
              return "css/index-generated[extname]";
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
      proxy: {
        "/mock": "http://echoapi.velir.com/",
      },
    },
    resolve: {
      alias: formatAliases(aliases),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "globalScss";',
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
