const parseArgs = (args) =>
  Object.keys(args).reduce((a, c) => ((a[c] = JSON.parse(args[c])), a), {});

export default parseArgs;
