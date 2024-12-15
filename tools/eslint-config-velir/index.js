module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      classes: true,
    },
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ["./lib/common", "./lib/react"],
};
