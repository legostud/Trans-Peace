import fs from "fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { modulePath } from "./package-constants.js";
import actions from "./actions.js";
import plopConfig from "./plopConfig.js";
import { REACT, TWIG, JSX } from "./constants/index.js";
const config = plopConfig.getConfig();
const __dirname = dirname(fileURLToPath(import.meta.url));

export const reactRenderFileOverride = (projectType, fileExtension) => (projectType === REACT || projectType === TWIG) && fileExtension === JSX;

export const checkForOverride = (path) => {
  try {
    if (fs.existsSync(`${process.cwd()}/.scaffold/${path}`)) {
      console.log(`override found using: ${process.cwd()}/.scaffold/${path}`);
      return `${process.cwd()}/.scaffold/${path}`;
    }
  } catch (err) {
    console.error("Error: ", err);
  }

  return `${modulePath}/${path}`;
};

export const getFolder = (project) => {
  let folder = {
    react: config.extension && config.extension.includes("js") ? "React/Js" : "React/Ts",
    twig: config.extension && config.extension.includes("js") ? "Twig/Js" : "Twig/Ts",

  };

  return folder[project];
};
const getExtension = (extension) => {
  return extension && extension.includes("x")
    ? extension.split("x")[0]
    : extension;
};

const getStylesName = (project) => {
  let style = {
    react: "scss",
    twig: "scss",
  };
  return style[project];
};

const getFormattedType = (type) => {
  const formatter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  if (type === "block" || type === "entity") {
    return formatter("block");
  }
  return formatter(type);
};

const getActionsBasedOnFrameWork = (type, data) => {
  const answeredData = data || {};

  let state = {
    type,
    ...plopConfig.getConfig(),
    extSplit: getExtension(config.extension),
    folder: getFolder(config.project), //expandable for other frameworks
    style: getStylesName(config.project), //expandable for other frameworks
    formattedType: getFormattedType(type), //format type for later use
    ...answeredData,
  };
  console.log(state);

  return state.extSplit && actions(state);
};

export default getActionsBasedOnFrameWork;
