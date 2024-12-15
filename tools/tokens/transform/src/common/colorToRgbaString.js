import TinyColor from "@ctrl/tinycolor";

export default {
  type: "value",
  matcher: function (token) {
    return token.type === "color";
  },
  transformer: function ({ value }) {
    return `${new TinyColor.TinyColor(value).toRgbString()}`;
  },
};
