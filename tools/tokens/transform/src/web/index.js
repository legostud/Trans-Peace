// import StyleDictionary from "style-dictionary-utils";
import formatCss from "./formatCss.js";

import sizePx from "./sizePx.js";
import webShadows from "./webShadows.js";
import webRadius from "./webRadius.js";
import webPadding from "./webPadding.js";
import webFont from "./webFont.js";
import webGradient from "./webGradient.js";
import webCubicBezier from "./webCubicBezier.js";
import webBreakpoints from "./webBreakpoints.js";

export default {
  transform: {
    "size/px": sizePx,
    "web/shadow": webShadows,
    "web/radius": webRadius,
    "web/padding": webPadding,
    "web/font": webFont,
    "web/gradient": webGradient,
    "web/cubicBezier": webCubicBezier,
    "web/breakpoints": webBreakpoints,
  },
  transformGroup: {
    "ease/scss": [
      "attribute/cti",
      "time/seconds",
      "web/cubicBezier",
      "cubicBezier/css",
    ],
    "clamp/css": [
      "attribute/cti",
      "name/cti/kebab",
      "time/seconds",
      "content/icon",
      "size/rem",
      "color/css",
      "shadow/css",
      "fontWeight/number",
      "web/radius",
      "web/padding",
      "web/gradient",
    ],
    "custom/css": [
      "web/breakpoints",
      "fontSize/rem",
      "font/css",
      "fontWeight/number",
      "lineHeight/rem",
      "attribute/cti",
      "name/cti/kebab",
      "time/seconds",
      "content/icon",
      "size/rem",
      "color/css",
      "shadow/css",
      "web/radius",
      "web/padding",
      "web/font",
      "web/gradient",
      "web/cubicBezier",
    ],
  },
  format: {
    "clamp/css": formatCss,
    "custom/css": formatCss,
  },
  action: {},
};
