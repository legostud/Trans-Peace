/**
 * componentList is an array of every component in thread
 * this will be used to dynamically import js for each component
 * using the renderer function.
 *
 * To add new components or change selectors edit the
 * index.js file in /js/modules.
 */

const createInit = async (selector, name, modules) => {
  const selectors = [...document.querySelectorAll(selector)];
  if (selectors.length <= 0) return;
  selectors.forEach((element, i) => {
    modules[`../${name}`]().then((module) => {
      const { default: initialize } = module;
      initialize(element, i);
    });
  });
};

/**
 * Dynamic Renderer
 * @module dynamicRenderer
 *
 * Accepts an array of components and creates imports.
 * Executes the default export for those imports passing supplied selector and an index
 * @param {array} c - list of components in componentList format
 *
 */
export default (c = []) => {
  const components = [...c];

  const modules = import.meta.glob(["../**/*.render.*", "../**/*.init.*"]);
  return components.map(({ selector, name }) => {
    //if the selector contains multiple classes we want to creat inits for all classes.
    if (typeof selector === "object") {
      selector.map((s) => createInit(s, name, modules));
    } else {
      return createInit(selector, name, modules);
    }
  });
};
