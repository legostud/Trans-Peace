import fs from 'fs';
import path from 'node:path';
import fse from "fs-extra/esm";
import { dirname } from "path";
import { fileURLToPath } from "url";
import * as changeCase from "change-case";
import {
  extensions,
  projects,
  httpVerbs,
  seperateFolderList,
  modulePath
} from './package-constants.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgFile = `${process.cwd()}/package.json`;


const copy = (data) => {
  try {
    fs.mkdir(`${__dirname}/plop-templates`, (err) => {
      fse.copySync(
        `${modulePath}/plop-templates`,
        `${process.cwd()}/.scaffold/plop-templates`
      );
      console.log("Templates copied successfully");
    });
  } catch (err) {
    console.error(err);
  }
};

const updateConfig = async (answers) => {
  try {
    let data = fs.readFileSync(pkgFile, 'utf-8')
    data = data && JSON.parse(data.toString())
    fs.writeFile(pkgFile, JSON.stringify({ ...data, scaffold: { ...answers } }, null, 2), (err, data) => err || data);
    return "configuration updated"
  } catch (err) {
    console.error(err);
  }
};

const getConfig = () => {
  let data = fs.readFileSync(pkgFile, 'utf-8')
  data = data && JSON.parse(data.toString())
  return data?.scaffold || {};
}

const ensureDirectoryExistence = (filePath) => {
  let dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}

/**
 * 
 * @param {*} plop 
 * @param {string} setting  
 *
 * @returns {function} setActionType
 */

export default {
  defaults: {
    // name: 'frontend',
    serviceType: 0,
    extension: 'jsx',
    project: 'react',
    sourceDir: 'frontend',
    componentsPath: 'frontend/js/components',
    blocksPath: "docroot/themes/custom/theme/src/blocks",
    entityPath: "docroot/themes/custom/theme/src/entity",
    twigTemplatesPath: "docroot/themes/custom/theme/templates/block",
    hooksPath: 'frontend/js/hooks',
    contextsPath: 'frontend/js/contexts',
    servicesPath: 'frontend/js/services',
    storiesPath: 'frontend/js/stories',
    rootJsDir: 'frontend/js',
    importStyles: true,
    includeTesting: false,
    namingConvention: "pascal",
    separateStories: false

  },
  frameworks: projects,
  getConfig,
  availableTypes: () => {
    return httpVerbs
  },
  availableseperateFolderList: () => {
    return seperateFolderList
  },
  availableExtensions: (option) => {
    return option && option.includes('*') ? extensions : ['js', 'ts']
  },
  helpers: (plop) => {
    plop.setActionType('doCopy', function (answers, config, plop) {
      return copy();
    });
    plop.setActionType('updateConfig', async function (answers, config, plop) {
      const configData = await updateConfig(answers);
      return configData;
    });
    /* define plop helpers */
    plop.setHelper('switch', function (value, options) {
      this.switch_value = value
      this.switch_break = false
      return options.fn(this)
    });

    plop.setHelper('dynamicCase', function (value) {
      const config = getConfig()
      config.namingConvention
      switch (config.namingConvention || "") {
        case "kebab":
          return changeCase.paramCase(value);
        case "pascal":
          return changeCase.pascalCase(value);
        case "camel":
          return changeCase.camelCase(value);
        default:
          return changeCase.pascalCase(value);
      }
    });

    plop.setHelper('upperCase', function (text) {
      return text.toUpperCase()
    })
    plop.setHelper('lowerCase', function (text) {
      return text.toLowerCase()
    })
    plop.setHelper('extensionSplit', function (text) {
      return text.includes('x') ? text.split('x')[0] : text
    })
    plop.setHelper('case', function (value, options) {
      if (value === this.switch_value) {
        this.switch_break = true
        return options.fn(this)
      }
    })
    plop.setHelper('default', function (value, options) {
      if (this.switch_break === false) {
        return value
      }
    })

    plop.setHelper('injectRenderCondition', function (cond1, cond2, options) {
      if (cond1 || cond2) {
        return options.fn(this)
      }
      return options.inverse(this);
    })

    return
  },
  ...getConfig(),
};
