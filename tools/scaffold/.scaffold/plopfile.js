import plopConfig from "./plopConfig.js";
import getActionsBasedoNFrameWork from "./utils.js";
import { extensions, projects } from  "./package-constants.js";
import { COMPONENT, CONTEXT, SERVICE, HOOK, SETUP,BLOCK, ENTITY } from "./constants/index.js";
import { checkForOverride, getFolder } from "./utils.js";
/**
 * Validation checks
 */
const config = plopConfig.defaults;

const isCorrectExtension = (value) => {
  return (value) => {
    if (!extensions.includes(value))
      return `\n${value} is not a correct extension please try to use \n1-js\n2-ts\n3-jsx\n4-tsx`;
    return true;
  };
};
const isCorrectFramework = (value) => {
  return (value) => {
    if (!projects.includes(value))
      return `\n${value} is not supported library or framework for this package please try to use \n1-react\n2-vue`;
    return true;
  };
};
const isProjectAdded = () => {
  return () => {
    if (config && config.project && config.extension) {
      return true;
    }
    return "\n Please add project and extension first by running \n npm run generate project (react/vue) (jsx/tsx/js/ts/vue)";
  };
};




export default (plop) => {  

  plopConfig.helpers(plop);
  
  /**
   * Set all the defaults when project is run,
   * answeres to a json file inside .scaffold for
   * later use. can be changed at any time.
   **/
  
  const defaults = {...config };
   plop.setGenerator(SETUP, {
    prompts: [
      {
        type: "list",
        name: "project",
        message: "Select the project type",
        default:  config.project,
        choices: projects.map(p => ({
          name: p,
          value: p,
        }))
      },
      {
        type: "list",
        name: "namingConvention",
        message: "Select the format to generate component files in",
        default:  config.namingConvention,
        choices: [{
          name: "PascalCase",
          value: "pascal",
        },
        {
          name: "camelCase",
          value: "camel",
        }, {
          name: "kebab-case",
          value: "kebab",
        }]
      },
      {
        type: "input",
        name: "themeName",
        default: config.themeName,
        message: "Enter Drupal theme name",
        when: (data) => data.project.toLowerCase().includes("twig"), 
      },
      {
        type: "input",
        name: "blocksPath",
        default: config.blocksPath,
        message: "Enter path to blocks directory",
        when: (data) => data.project.toLowerCase().includes("twig"), 
      },
      {
        type: "input",
        name: "entityPath",
        default: config.entityPath,
        message: "Enter path to entity directory",
        when: (data) => data.project.toLowerCase().includes("twig"), 
       },
      {
        type: "input",
        name: "extension",
        default: config.extension,
        message: "Select the extension",
        validate: isCorrectExtension("extension"),
      },
      {
        type: "input",
        name: "extension",
        default: config.extension,
        message: "Select the extension",
        validate: isCorrectExtension("extension"),
      },
       {
        type: "input",
        name: "twigTemplatesPath",
        default: config.twigTemplatesPath,
        message: "Enter path to template directory",
        when: (data) => data.project.toLowerCase().includes("twig"), 
       },
       {
        type: "confirm",
        name: "separateStories",
        message: "Add stories to dedicated directory?",
        default: config.separateStories,
      },
      {
        type: "input",
        name: "storiesPath",
        default: config.storiesPath,
        message: "Enter path to stories directory",
        when: (data) => !data.separateStories, 
      },
      {
        type: "input",
        name: "componentsPath",
        default: config.componentsPath,
        message: "Enter path to components directory",
      },
      {
        type: "input",
        name: "hooksPath",
        default: config.hooksPath,
        message: "Enter path to hooks directory",
      },
      {
        type: "input",
        name: "contextsPath",
        default: config.contextsPath,
        message: "Enter path to contexts directory",
      },
      {
        type: "input",
        name: "servicesPath",
        default: config.servicesPath,
        message: "Enter path to services directory",
      },
      {
        type: "input",
        name: "storiesPath",
        default: config.storiesPath,
        message: "Enter path to stories directory",
        when: (data) => !data.project.toLowerCase().includes("twig"), 
      },
      {
        type: "input",
        name: "rootJsDir",
        default: config.rootJsDir,
        message: "Enter path to js directory",
      },
      {
        type: "confirm",
        name: "includeTesting",
        message: "Do you want to include unit testing for components?",
        default: config.includeTesting,
      },
      {
        type: "list",
        name: "testingLibrary",
        message: "Select a testing environment",
        when: (data) => data.includeTesting, 
        choices: [
          {
            name: "vitest",
            value: "vi",
            description: "Vitest testing environment"
          },
          {
            name: "jest",
            value: "jest",
            description: "Jest testing environment"
          }
        ]
      },
    ],

    /**
     * To update defaults you need to run the project
     * generator again "npm run scaffold:setup" or
     * "npm run "scaffold:setup:default" to reset current
     * settings.
     **/

    actions: (data) => {
      const actions = [
        {
          type: "updateConfig",
        },
      ];

      if (data.includeTesting) {
        const folder = getFolder(defaults.project);
        const templateDir = `plop-templates/${folder}`;
        const jsDir = data.rootJsDir.toLowerCase();

        if (data.testingLibrary === "jest") {
          /* Logic here to PLOP INJECT on the package.json */
        } else {
          actions.push(
            {
              /**
              *  Set Jest Setup File
              */
              type: "append",
              path: "vite.config.ts",
              pattern: "/*PLOP_INJECT_VITE_*/",
              template: `test: { coverage: { provider: "v8", enabled: true, reportsDirectory: "${jsDir}/test/", }, environment: "jsdom", globals: true, setupFiles: "${jsDir}/test/setupTests.js"},`,
            },
          );
        }

        actions.push(
            {
              /**
              *  Set Jest Setup File
              */
              type: "add",
              path: `${jsDir}/test/setupTests.js`,
              templateFile: checkForOverride(`${templateDir}/Test/setupTests.hbs`),
              skipIfExists: true,
            },
          );
      }

      return actions;
    },
  });

  plop.setGenerator(COMPONENT, {
    description: "Create a component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
        validate: isProjectAdded(),
      },
      {
        type: "confirm",
        name: "addInitFile",
        message: "Do you want to add a init file for your vanilla JS?",
      },
      {
        type: "confirm",
        name: "addRenderFile",
        message: "Do you want to add a render file for your React component?",
      },
      {
        type: "confirm",
        name: "addComponentTestFile",
        message: "Do you want to add a test file for your React component?",
      },
    ],
    actions: (data) => getActionsBasedoNFrameWork(COMPONENT, data),
  });
  plop.setGenerator(BLOCK, {
    description: "Create a block",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your block name?",
        validate: isProjectAdded(),
      },
      {
        type: "confirm",
        name: "addInitFile",
        message: "Do you want to add a init file for your vanilla JS?",
      },
      {
        type: "confirm",
        name: "addRenderFile",
        message: "Do you want to add a render file for your block?",
      },
      {
        type: "confirm",
        name: "addComponentTestFile",
        message: "Do you want to add a test file for your block?",
      },
    ],
    actions: (data) => getActionsBasedoNFrameWork(BLOCK, data),
  });

  plop.setGenerator(ENTITY, {
    description: "Create an entity",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your entity name?",
        validate: isProjectAdded(),
      },
      {
        type: "confirm",
        name: "addInitFile",
        message: "Do you want to add a init file for your vanilla JS?",
      },
      {
        type: "confirm",
        name: "addRenderFile",
        message: "Do you want to add a render file for your entity?",
      },
      {
        type: "confirm",
        name: "addComponentTestFile",
        message: "Do you want to add a test file for your entity?",
      },
    ],
    actions: (data) => getActionsBasedoNFrameWork(ENTITY, data),
  });

  plop.setGenerator(CONTEXT, {
    description: "Create a context",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your context name?",
        validate: isProjectAdded(),
      },
    ],
    actions: () => getActionsBasedoNFrameWork(CONTEXT),
  });

  plop.setGenerator(SERVICE, {
    description: "Create service",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is your service name (will be prefixed with service type?",
      },
      {
        type: "confirm",
        name: "isParams",
        message: "Do you want to use Params inside your service?",
      },
      {
        type: "list",
        name: "serviceType",
        message: "Select the type of service you want to create",
        choices: () => plopConfig.availableTypes(),
      },
    ],
    actions: (data) => getActionsBasedoNFrameWork(SERVICE, data),
  });

  plop.setGenerator(HOOK, {
    description: "Create hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your hook name?",
      },
    ],
    actions: () => getActionsBasedoNFrameWork(HOOK),
  });
  
  plop.setGenerator("copy", {
    description: "Copy templates into your project to customize markup",
    prompts: [],
    actions:  (data)=> {
      const actions = [];

      actions.push({type: "doCopy"});

      return actions;
    }
  });
};
