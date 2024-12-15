#!/usr/bin/env node

//https://github.com/Aashir-334/react-plop-template
import path from "node:path";
import minimist from "minimist";
import { Plop, run } from "plop";
const args = process.argv.slice(2);
const argv = minimist(args);

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
Plop.prepare(
  {
    cwd: argv.cwd,
    // In order for `plop` to always pick up the `plopfile.js` despite the CWD, you must use `__dirname`
    configPath: path.join(__dirname, ".scaffold/plopfile.js"),
    require: argv.require,
    completion: argv.completion,
    // This will merge the `plop` argv and the generator argv.
    // This means that you don't need to use `--` anymore
  },
  (env) =>
    Plop.execute(env, (env) => {
      const options = {
        ...env,
        dest: process.cwd(), // this will make the destination path to be based on the cwd when calling the wrapper
      };

      return run(options, undefined, true);
    }),
);
