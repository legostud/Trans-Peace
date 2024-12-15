import * as R from "ramda";
import { COMPONENT, BLOCK, ENTITY, CONTEXT, SERVICE, HOOK, STORIES } from "./constants/index.js";
import { checkForOverride, reactRenderFileOverride } from "./utils.js";

export default ({
  type,
  formattedType,
  extension,
  extSplit,
  folder,
  blocksPath,
  entityPath,
  twigTemplatesPath,
  componentsPath,
  hooksPath,
  contextsPath,
  servicesPath,
  storiesPath,
  addInitFile,
  addRenderFile,
  addComponentTestFile,
  rootJsDir,
  themeName,
  separateStories,
  namingConvention,
  project,
  ...rest
}) => {
  let isTwig = false;
  const extReducer = (type) => {
    let fileEx = extSplit;
    switch (type) {
      case CONTEXT:
      case COMPONENT:
      case BLOCK:
      case ENTITY:
        fileEx = extension;
      default: break;
    }
    return fileEx;
  };

  const pathReducer = (type) => {
    switch (type) {
      case BLOCK: {
        isTwig = true;
        return blocksPath;
      }
      case ENTITY: {
        isTwig = true;
        return entityPath;
      }
      case COMPONENT:
        return componentsPath;
      case HOOK:
        return hooksPath;
      case CONTEXT:
        return contextsPath;
      case SERVICE:
        return servicesPath;
      case STORIES:
        return storiesPath;
      default: break;
    }
  };
  const namingConventionReducer = (convention = "") => {
    switch (convention) {
      case "pascal":
        return '{{pascalCase name}}';
      case "camel":
        return '{{camelCase name}}';
      case "kebab":
        return '{{kebabCase name}}';
      default:
        return '{{pascalCase name}}';
    }
  }

  console.log("type: ", type);
  const templateFolderPath = `plop-templates/${folder}`;
  const path = `${pathReducer(type)}`;
  console.log("path", path);
  const template = `${templateFolderPath}/${formattedType}/${formattedType}`;

  console.log("TEMPLATE", template);
  const templateDir = `${templateFolderPath}/${formattedType}/`;
  const fileExt = extReducer(type);
  const storiesDir = separateStories ? storiesPath.toLowerCase() : `${path.toLowerCase()}/{{dynamicCase name}}`;
  let files = [];

  const shouldOverrideAddRenderFile = reactRenderFileOverride(project, extension);

  switch (type) {
    /* add Block
     * Organism level component that is directly
     * imported into tempates or pages
     * */
    case BLOCK: {
      files = [
        {
          /**
            *  ADD main index.js file
            */
          type: "add",
          path: `${rootJsDir}/index.${extSplit}`,
          templateFile: checkForOverride(`${templateFolderPath}/injectable-index.hbs`),
          skipIfExists: true,
        },
        {
          /**
          *  ADD block library js file
          */
          type: "add",
          path: `${path.toLowerCase()}/index.${extSplit}`,
          templateFile: checkForOverride(`${templateDir}/injectable-library.hbs`),
          skipIfExists: true,
        },
        {
          /**
           *  ADD block story file
           */
          type: "add",
          path: `${storiesDir}/{{pascalCase name}}.stories.${fileExt}`,
          templateFile: checkForOverride(`${template}.stories.hbs`),
          skipIfExists: true,
          data: { type }
        },
        {
          /**
           *  ADD block scss file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{dynamicCase name}}/{{kebabCase name}}.scss`,
          templateFile: checkForOverride(`${template}.scss.hbs`),
          skipIfExists: true,
        },
        {
          /**
           *  ADD component mockData file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{dynamicCase name}}/{{pascalCase name}}.mockData.${extSplit}`,
          templateFile: checkForOverride(`${template}.mockData.hbs`),
          skipIfExists: true,
        },
        {
          /**
           *  ADD block index file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{dynamicCase name}}/index.${extSplit}`,
          templateFile: checkForOverride(`${templateDir}index.hbs`),
          skipIfExists: true,
          data: { addRenderFile, addInitFile, shouldOverrideAddRenderFile }
        },
        {
          /**
           *  ADD template file
           */
          type: "add",
          path: `${twigTemplatesPath}/block--bundle--{{kebabCase name}}.html.twig`,
          templateFile: checkForOverride(`${template}.template.twig.hbs`),
          skipIfExists: true,
          data: { themeName }
        },

      ]
      break;
    }

    case COMPONENT: {
      files = [
        {
          /**
           *  Set component file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{dynamicCase name}}/{{pascalCase name}}.${fileExt}`,
          templateFile: checkForOverride(`${template}.hbs`),
          skipIfExists: true,
        },
        {
          /**
            *  Set index js file
            */
          type: "add",
          path: `${rootJsDir}/index.${extSplit}`,
          templateFile: checkForOverride(`${templateFolderPath}/injectable-index.hbs`),
          skipIfExists: true,
        },
        {
          /**
          *  Set components library js file
          */
          type: "add",
          path: `${path.toLowerCase()}/index.${extSplit}`,
          templateFile: checkForOverride(`${templateDir}/injectable-library.hbs`),
          skipIfExists: true,
        },
        {
          /**
           *  Set component story file
           */
          type: "add",
          path: `${storiesDir}/{{pascalCase name}}.stories.${fileExt}`,
          templateFile: checkForOverride(`${template}.stories.hbs`),
          skipIfExists: true,
        },
        {
          /**
           *  Set component scss file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{dynamicCase name}}/{{kebabCase name}}.scss`,
          templateFile: checkForOverride(`${template}.scss.hbs`),
          skipIfExists: true,
        },
        {
          /**
           *  Set component mockData file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{dynamicCase name}}/{{pascalCase name}}.mockData.${extSplit}`,
          templateFile: checkForOverride(`${template}.mockData.hbs`),
          skipIfExists: true,
        },

        // TODO MOVE TO REACT ONLY
        {
          /**
           *  Set component props file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{dynamicCase name}}/{{pascalCase name}}.propTypes.${extSplit}`,
          templateFile: checkForOverride(`${template}.propTypes.hbs`),
          skipIfExists: true,
        },

        {
          /**
           *  Set component index file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{dynamicCase name}}/index.${extSplit}`,
          templateFile: checkForOverride(`${templateDir}index.hbs`),
          skipIfExists: true,
          data: { addRenderFile, addInitFile, shouldOverrideAddRenderFile }
        },

        {
          /**
          *  Update index file with import of init file
          */
          type: 'append',
          path: `${rootJsDir}/index.${extSplit}`,
          pattern: `/* PLOP_INDEX_IMPORT */`,
          templateFile: checkForOverride(`${templateFolderPath}/injection-template.hbs`),
          data: { relativePath: componentsPath.replace(`${rootJsDir}/`, ""), rootJsDir, componentsPath, addRenderFile, addInitFile, addComponentTestFile, shouldOverrideAddRenderFile },
          skip: (data) => !data?.addInitFile || !data?.addRenderFile || !data?.shouldOverrideAddRenderFile ? "skip" : false,
        },
      ]
      break;
    }

    /* add context */
    case CONTEXT: {
      files = [
        {
          /**
           *  Set context file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{pascalCase name}}/{{pascalCase name}}.context.${fileExt}`,
          templateFile: checkForOverride(`${template}.context.hbs`),
        },
        {
          /**
           *  Set context reducer file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{pascalCase name}}/{{pascalCase name}}.reducer.${extSplit}`,
          templateFile: checkForOverride(`${template}.reducer.hbs`),
        },
        {
          /**
           *  Set context constants file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{pascalCase name}}/{{pascalCase name}}.${extSplit}`,
          templateFile: checkForOverride(`${templateDir}constants.hbs`),
        },
        {
          /**
           *  Set context index file
           */
          type: "add",
          path: `${path.toLowerCase()}/{{pascalCase name}}/index.${fileExt}`,
          templateFile: checkForOverride(`${templateDir}index.hbs`),
          skipIfExists: true,
        },
      ]
      break;
    }

    /* add hook / service */
    default:
      files = [
        {
          type: "add",
          path: `${path.toLowerCase()}/{{pascalCase name}}.${fileExt}`,
          templateFile: checkForOverride(`${template}.hbs`),
        }
      ];
      break;
  }

  /**
   * conditional files
   **/

  if (addInitFile) {
    files = [
      ...files,
      {
        /**
        *  Set component init js file
        */
        type: "add",
        path: `${path.toLowerCase()}/{{dynamicCase name}}/{{pascalCase name}}.init.${extSplit}`,
        templateFile: checkForOverride(`${template}.init.hbs`),
        skipIfExists: true,
      },
    ]
  }

  if (addRenderFile || shouldOverrideAddRenderFile) {
    files = [
      ...files,
      {
        /**
         *  Set component file
         */
        type: "add",
        path: `${path.toLowerCase()}/{{dynamicCase name}}/{{pascalCase name}}.${fileExt}`,
        templateFile: checkForOverride(`${template}.hbs`),
        skipIfExists: true,
      },
      {
        /**
        *  Set component render js file
        */
        type: "add",
        path: `${path.toLowerCase()}/{{dynamicCase name}}/{{pascalCase name}}.render.${fileExt}`,
        templateFile: checkForOverride(`${template}.render.hbs`),
        skipIfExists: true,
      },
      {
        /**
         *  Set component props file
         */
        type: "add",
        path: `${path.toLowerCase()}/{{dynamicCase name}}/{{pascalCase name}}.propTypes.${extSplit}`,
        templateFile: checkForOverride(`${template}.propTypes.hbs`),
        skipIfExists: true,
      },
      {
        /**
          *  update components library file with export of component file
          */
        type: "append",
        path: `${path.toLowerCase()}/index.${extSplit}`,
        pattern: `/* PLOP_INJECT_LIB_EXPORT */`,
        templateFile: checkForOverride(`${templateDir}/injection-component-lib-react.hbs`),
        data: { relativePath: componentsPath.replace(`${rootJsDir}/`, ""), rootJsDir, componentsPath, addRenderFile, addInitFile, addComponentTestFile, shouldOverrideAddRenderFile },
      },
    ]
  }

  if (addRenderFile || addInitFile || shouldOverrideAddRenderFile) {
    files = [
      ...files,
      {
        /**
        *  Update index file with import of init file
        */
        type: 'append',
        path: `${rootJsDir}/index.${extSplit}`,
        pattern: `/* PLOP_INDEX_IMPORT */`,
        templateFile: checkForOverride(`${templateFolderPath}/injection-template.hbs`),
        data: { relativePath: path.replace(`${rootJsDir}/`, ""), rootJsDir, componentsPath, addRenderFile, addInitFile, addComponentTestFile, shouldOverrideAddRenderFile },
        skip: (data) => !data?.addInitFile || !data?.addRenderFile || !data?.shouldOverrideAddRenderFile ? "skip" : false,
      }
    ];
  }

  if (addComponentTestFile) {
    files = [
      ...files,
      {
        /**
        *  Set component test directory and test file
        */
        type: "add",
        path: `${path.toLowerCase()}/{{dynamicCase name}}/__tests__/{{pascalCase name}}.test.${fileExt}`,
        templateFile: checkForOverride(`${template}.test.hbs`),
        skipIfExists: true,
      },
    ]
  }

  if (isTwig) {
    files = [
      ...files,
      {
        /**
         *  ADD markup file
         */
        type: "add",
        path: `${path.toLowerCase()}/{{dynamicCase name}}/{{kebabCase name}}.html.twig`,
        templateFile: checkForOverride(`${template}.html.twig.hbs`),
        skipIfExists: true,
      }];

    if (shouldOverrideAddRenderFile) {
      files.push(
        {
          /**
          *  Set component render js file
          */
          type: "add",
          path: `${path.toLowerCase()}/{{dynamicCase name}}/{{kebabCase name}}.render.${fileExt}`,
          templateFile: checkForOverride(`${template}.render.hbs`),
          skipIfExists: true,
        }
      )
    }
  }


  return R.flatten([
    "------------------------------",
    `Generating a new ${type}...`,
    "------------------------------",
    ...files,
  ]);
};
