#!/usr/bin/env node

import fs from "node:fs";
import browserSync from "browser-sync";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

browserSync.create();

/**
 * Run Browsersync with server config
 * You can use an arrays for files to specify multiple files
 */

const argv = yargs(hideBin(process.argv)).argv;
const logger = (cat, msg) => console.log(`[${chalk.blue(cat)}]: ${msg}`);
const errorLogger = (cat, msg) => console.log(`[${chalk.bgRed(cat)}]: ${msg}`);

const validProject = (args, settings) => {
  const { site } = args;
  const project = settings?.[site];
  const availableOptions = Object.keys(settings);

  const inOpts = (site) => availableOptions.includes(site);
  if (site && inOpts(site)) {
    logger("BrowserSync", "Starting Proxy Server...");
    logger("BrowserSync", `Proxying URL: ${project?.proxy?.url}`);
    logger(
      "BrowserSync",
      `Watching files: ${path.resolve(
        __dirname,
        "../../",
        project?.proxy?.build,
      )}`,
    );
    return true;
  } else if (site && !inOpts(site)) {
    errorLogger("ERROR", "Invalid site name");
    logger("BrowserSync", "Available options include:");
    availableOptions.forEach((i) => logger("Option", `"${i}"`));
  }
  return false;
};

const runBrowserSync = (sitesconfig) => {
  /**
   * import config file based on user input
   * */
  const project = sitesconfig?.[argv?.site];
  if (validProject(argv, sitesconfig)) {
    browserSync.init({
      watch: true,
      proxy: project?.proxy?.url,
      serveStatic: [
        {
          route: project?.proxy?.route,
          dir: [path.resolve(__dirname, "../../", project?.proxy?.build)],
        },
      ],
      files: [path.resolve(__dirname, "../../", project?.proxy?.build)],
      https: project?.proxy?.https || false,
    });
  } else {
    errorLogger("ERROR", "You must to specify a project to proxy.");
    errorLogger("ERROR", "See readme.md for more info.");
  }
};
try {
  fs.readFile(`${process.cwd()}/package.json`, "utf8", (error, data) => {
    const { sitesconfig } = JSON.parse(data);

    if (sitesconfig) {
      logger("BrowserSync", "Config found!");
      runBrowserSync(sitesconfig);
    } else {
      errorLogger("ERROR", "Config not found!");
    }
    if (error) {
      console.log(error);
      return;
    }
  });
} catch (err) {
  errorLogger("ERROR", err);
}
