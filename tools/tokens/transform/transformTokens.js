// const StyleDictionary = require('style-dictionary-utils');
import StyleDictionary from "style-dictionary-utils";
import { getStyles, clampFunction } from "./helpers/index.js";
import webConfig from "./src/web/index.js";
import deepMerge from "deepmerge";

StyleDictionary.registerTransform({
  name: "fontSize/rem",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return token.type === "dimension" || token.type === "custom-fontStyle";
  },
  transformer: (token, platform) => {
    const baseFont = platform?.basePxFontSize || 16;
    const val =
      token.type === "custom-fontStyle" ? token.value.fontSize : token.value;
    const floatVal = parseFloat(val);

    if (isNaN(floatVal)) {
      throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to rem \n`;
    }

    if (floatVal === 0) {
      return token.type === "custom-fontStyle"
        ? { ...token.value, fontSize: "0" }
        : "0";
    }
    const { value } = token;
    if (value) {
      return token.type === "custom-fontStyle"
        ? { ...token.value, fontSize: `${floatVal / baseFont}rem` }
        : `${floatVal / baseFont}rem`;
    }
  },
});

StyleDictionary.registerTransform({
  name: "lineHeight/rem",
  type: "value",
  transitive: true,
  matcher: (token) => {
    return token.type === "dimension" || token.type === "custom-fontStyle";
  },
  transformer: (token, platform) => {
    const baseFont = platform?.basePxFontSize || 16;
    const val =
      token.type === "custom-fontStyle" ? token.value.lineHeight : token.value;
    const floatVal = parseFloat(val);

    if (isNaN(floatVal)) {
      throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to rem \n`;
    }

    if (floatVal === 0) {
      return token.type === "custom-fontStyle"
        ? { ...token.value, lineHeight: "0" }
        : "0";
    }
    const { value } = token;
    if (value) {
      return token.type === "custom-fontStyle"
        ? { ...token.value, lineHeight: `${floatVal / baseFont}rem` }
        : `${floatVal / baseFont}rem`;
    }
  },
});

//  name: "css/classFormat",
StyleDictionary.registerFormat({
  name: "css/classFormat",
  formatter: function (dictionary, config) {
    return `
  ${dictionary.allProperties
    .map((prop) => {
      return `
  .${prop.name} {
      font-family: ${prop.value.fontFamily},
      font-size: ${prop.value.fontSize},
      font-weight: ${prop.value.fontWeight},
      line-height: ${prop.value.lineHeight}
  };`;
    })
    .join("\n")}
  `;
  },
});

//  name: "breakpoint/pcss",
StyleDictionary.registerFormat({
  name: "breakpoint/pcss",
  formatter: function ({ dictionary, platform, options, file }) {
    let output = dictionary.allProperties.reduce((acc, prop) => {
      if (prop.name.includes("breakpoint")) {
        return (acc += `
          @custom-media --${prop.attributes.type}-min screen and (min-width: ${
          prop.original.value
        }px);\n
          @custom-media --${prop.attributes.type}-max screen and (max-width: ${
          Number(prop.original.value) - 1
        }px);\n`);
      } else {
        return acc;
      }
    }, "/** THIS FILE IS GENERATED DO NOT EDIT**/\n\n");
    return output;
  },
});
//  name: "fontStyleClamp/css",
StyleDictionary.registerFormat({
  name: "fontStyleClamp/scss",

  formatter: function ({ dictionary }) {
    const styles = getStyles(dictionary.allProperties);
    const customProps = styles.reduce((acc, style) => {
      if (style?.["400"] && style?.["desktop"]) {
        const fontSize = `clamp(${clampFunction({
          maxFontSize: style?.["desktop"].value.fontSize,
          minFontSize: style?.["400"].value.fontSize,
          maxWidth: 1600,
          minWidth: 800,
        })})`;
        const lineHeight = `clamp(${clampFunction({
          maxFontSize: style?.["desktop"].value.lineHeight,
          minFontSize: style?.["400"].value.lineHeight,
          maxWidth: 1600,
          minWidth: 800,
        })})`;
        return (acc += `$${style.name
          .toLowerCase()
          .replaceAll(" ", "-")}-clamp: ${style?.["desktop"].value.fontStyle} ${
          style?.["desktop"].value.fontVariant || "normal"
        } ${style?.["desktop"].value.fontWeight} ${fontSize}/${lineHeight} '${
          style?.["desktop"].value.fontFamily
        }';\n`);
      }
      return acc;
    }, "");

    return `\n${customProps}\n`;
  },
});

//  name: "mixin/scss"",
StyleDictionary.registerFormat({
  name: "mixin/scss",

  formatter: function ({ dictionary }) {
    const customProps = dictionary.allProperties.reduce((acc, style) => {
      if (
        style.value.easingType === "cubicBezier" &&
        style.value.easingFunction
      ) {
        const { x1, x2, y1, y2 } = style.value.easingFunction;

        return (acc += `\n
      @mixin ${style.path.join("-")}($property: all){
        transition: $property cubic-bezier(${x1}, ${y1}, ${x2}, ${y2}) ${
          style.value.duration
        }s;
      }`);
      } else {
        return "";
      }
    }, "");

    return `\n${customProps}\n`;
  },
});

StyleDictionary.registerFilter({
  name: "validToken",
  matcher: function (token) {
    return [
      "dimension",
      "string",
      "number",
      "color",
      "custom-spacing",
      // "custom-grid",
      "custom-gradient",
      "custom-fontStyle",
      "custom-radius",
      "custom-shadow",
      "custom-transition",
    ].includes(token.type);
  },
});
StyleDictionary.registerFilter({
  name: "fontToken",
  matcher: function (token) {
    return ["custom-fontStyle"].includes(token.type);
  },
});
StyleDictionary.registerFilter({
  name: "transitionTokens",
  matcher: function (token) {
    return ["custom-transition"].includes(token.type);
  },
});

const StyleDictionaryExtended = StyleDictionary.extend({
  ...deepMerge.all([webConfig]),
  source: ["tools/tokens/*.json"],
  platforms: {
    ease: {
      buildPath: "frontend/scss/generated/",
      files: [
        {
          filter: "transitionTokens",
          destination: "_easing-mixins.scss",
          format: "mixin/scss",
          outputReferences: true,
          options: {
            showFileHeader: false,
          },
        },
      ],
      options: {
        basePxFontSize: 16,
      },
    },
    special: {
      transformGroup: "clamp/css",
      buildPath: "frontend/scss/generated/",
      files: [
        {
          filter: "fontToken",
          destination: "_font-clamp.scss",
          format: "fontStyleClamp/scss",
          outputReferences: true,
          options: {
            showFileHeader: false,
          },
        },
      ],
      options: {
        basePxFontSize: 16,
      },
    },
    scss: {
      transformGroup: "custom/css",
      buildPath: "frontend/scss/generated/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
          filter: "validToken",
          options: {
            showFileHeader: false,
          },
        },
      ],
      options: {
        basePxFontSize: 16,
      },
    },
  },
});

StyleDictionaryExtended.buildAllPlatforms();
