import * as R from "ramda";
import themeConfig from "@/js/utils/theme-config";
import * as changeCase from "change-case";

/**
 * Converts arguments to data attributes with stringified values.
 * @param {Object} args - The arguments object.
 * @returns {Object} - The data attributes object.
 */
export const stringifyArgs = (args) =>
  Object.keys(args).reduce(
    (a, c) => ((a["data-" + c.toLowerCase()] = JSON.stringify(args[c])), a),
    {}
  );

/**
 * Converts a string to a readable string format.
 * @param {string} str - The input string.
 * @param {boolean} [title=false] - Flag indicating whether to return as title case.
 * @returns {string} - The formatted string.
 */
  const toReadableString = (str, title = false) => {
  if (title) {
    return changeCase.sentenceCase(str);
  } else {
    return changeCase.noCase(str);
  }
}

/**
 * Reduces argument value based on the provided key and property.
 * @param {string} arg - The argument key.
 * @param {string} val - The value corresponding to the argument.
 * @param {*} [nullValue=null] - Default value if argument value is null.
 * @returns {*} - The reduced value.
 */
const argReducer = (arg, val, nullValue = null) => { console.log(themeConfig[arg][val], nullValue, val); return themeConfig[arg][val] || nullValue || val };

/**
 * Generates space reducer based on provided parameters.
 * @param {string} key - The key for the space options.
 * @param {string} prop - The property to add.
 * @param {string} pos - The position specifier.
 * @returns {string} - The generated space reducer value.
 */
export const spaceReducer = (key, prop, pos) => {
  return `${prop}${pos}-${themeConfig?.spaceOptions[key] || key}`;
}

/**
 * Generates an argument type object.
 * @param {string} prop - The property name.
 * @param {string} typeSummary - The summary of the type.
 * @param {string} controlType - The type of control.
 * @param {Object} options - The options for the property.
 * @returns {Object} - The argument type object.
 */
export const makeArgType = (prop, typeSummary, controlType, options) => {
  return {
    [`${prop}`]: {
      name: `${toReadableString(prop, true)}`,
      description: `Select ${toReadableString(prop, false)} option`,
      table: {
        type: typeSummary,
      },
      options,
      control: {
        type: controlType,
      },
    },
  };
};

/**
 * Disables control for a given property.
 * @param {string} prop - The property to disable control for.
 * @returns {Object} - The disabled control object.
 */
export const disableControl = (prop) => ({
  [prop]: {
    control: false,
    table: {
      disable: true,
    },
  },
});

/**
 * Disables controls for an array of properties.
 * @param {string[]} props - The properties to disable controls for.
 * @returns {Object} - The disabled controls object.
 */
export const disableControls = (props) =>
  props.reduce(
    (acc, prop) => ({
      ...acc,
      ...disableControl(prop),
    }),
    {}
  );

/** Represents opacity options. */
export const OPACITY = {
  opacity: {
    name: "Overlay opacity",
    control: { type: "range", min: 0, max: 75, step: 25 },
  },
};

/** Represents lazy loading options. */
export const LAZY_LOADING = makeArgType(
  "loading",
  "Select loading option",
  "select",
  Object.keys(themeConfig?.loading)
);

/** Represents aspect ratio options. */
export const ASPECT_RATIOS = makeArgType(
  "aspectRatio",
  "Select aspect ratio",
  "select",
  Object.keys(themeConfig?.aspectRatio)
);

/** Represents icon size options. */
export const ICON_SIZE = makeArgType(
  "iconSize",
  "Select icon size",
  "select",
  Object.keys(themeConfig?.iconSize)
);

/** Represents icon name options. */
export const ICON_NAME = makeArgType(
  "iconName",
  "Select icon",
  "select",
  Object.keys(themeConfig?.iconName)
);

/** Represents margin top options. */
export const MARGIN_TOP = makeArgType(
  "marginTop",
  "Add margin top",
  "select",
   Object.keys(themeConfig?.spaceOptions),
  "Set the component's top margin"
);

/** Represents margin bottom options. */
export const MARGIN_BOTTOM = makeArgType(
  "marginBottom",
  "Add margin bottom",
  "select",
  Object.keys(themeConfig?.spaceOptions),
  "Set the component's bottom margin"
);

/** Represents padding top options. */
export const PADDING_TOP = makeArgType(
  "paddingTop",
  "Add padding top",
  "select",
  Object.keys(themeConfig?.spaceOptions),
  "Set the component's top padding"
);

/** Represents padding bottom options. */
export const PADDING_BOTTOM = makeArgType(
  "paddingBottom",
  "Add padding bottom",
  "select",
  Object.keys(themeConfig?.spaceOptions),
  "Set the component's bottom padding"
);

/** Represents background color options. */
export const BACKGROUND_COLOR = makeArgType(
  "backgroundColor",
  "Add background color",
  "select",
  Object.values(themeConfig?.backgroundColor),
  "Set the component's background color"
);

/** Represents youtube URL options. */
export const YT_URL = makeArgType("url", "Add youtube URL", "string", "text");

/** Represents margin all options. */
export const MARGIN_ALL = { ...MARGIN_TOP, ...MARGIN_BOTTOM };

/** Represents padding all options. */
export const PADDING_ALL = { ...PADDING_TOP, ...PADDING_BOTTOM };

/** Represents spacing all options. */
export const SPACING_ALL = { ...PADDING_ALL, ...MARGIN_ALL };

/**
 * Sets arguments based on the provided object.
 * @param {Object} args - The arguments object.
 * @returns {Object} - The processed arguments object.
 */
export const setArgs = (args) => ({
  ...args,
  ...(args?.theme && { theme: argReducer("theme", args.theme) }),
  ...(args?.loading && { loading: argReducer("loading", args.loading) }),
  ...(args?.iconSize && { iconSize: argReducer("iconSize", args.iconSize) }),
  ...(args?.iconName && { iconName: argReducer("iconName", args.iconName) }),
  ...(args?.aspectRatio && { aspectRatio: argReducer("aspectRatio", args.aspectRatio) }),
  ...(args?.marginTop && { marginTop: spaceReducer(args?.marginTop, "m", "t") }),
  ...(args?.marginBottom && {
    marginBottom: spaceReducer(args?.marginBottom, "m", "b"),
  }),
  ...(args?.paddingTop && { paddingTop: spaceReducer(args?.paddingTop, "p", "t") }),
  ...(args?.paddingBottom && {
    paddingBottom: spaceReducer(args?.paddingBottom, "p", "b"),
  }),
  ...(args?.alignment && { alignment: argReducer("alignment", args.alignment) }),
  ...(args?.opacity && { opacity: args.opacity }),
});

/**
 * Switches argument based on the provided argument key.
 * @param {string} arg - The argument key.
 * @returns {Object} - The processed argument type object.
 */
const argSwitch = (arg) => {
  switch (arg) {
    case "loading":
      return makeArgType(
        arg,
        "string",
        "select",
        Object.keys(themeConfig?.loading)
      );
    case "theme":
      return makeArgType(
        arg,
        "string",
        "select",
        Object.keys(themeConfig?.theme)
      );
    case "padding":
      return PADDING_ALL;
    case "paddingTop":
      return PADDING_TOP;
    case "paddingBottom":
      return PADDING_BOTTOM;
    case "margin":
      return MARGIN_ALL;
    case "marginTop":
      return MARGIN_TOP;
    case "marginBottom":
      return MARGIN_BOTTOM;
    case "iconSize":
      return ICON_SIZE;
    case "iconName":
      return ICON_NAME;
    case "aspectRatio":
      return ASPECT_RATIOS;
    case "alignment":
      return makeArgType(
        arg,
        "string",
        "select",
        Object.keys(themeConfig?.alignment)
      );
    case "maxWidth":
      return makeArgType(arg, "string", "number");
    case "opacity":
      return OPACITY;
    default:
      return {
        [arg]: {
          name: toReadableString(arg, true),
        },
      };
  }
};

/**
 * Sets argument types based on the provided arguments.
 * @param {Object} args - The arguments object.
 * @returns {Object} - The processed argument types object.
 */
export const setArgTypes = R.compose(R.mergeAll, R.map(argSwitch), R.keys);
