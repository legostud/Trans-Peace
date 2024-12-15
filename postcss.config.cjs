module.exports = (ctx) => {
  return {
    plugins: {
      "postcss-preset-env": {
        stage: 3,
      },
    },
  };
};
