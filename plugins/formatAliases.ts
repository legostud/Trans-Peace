import { resolve } from "path";

const formatAliases = (aliases) =>
  Object.entries(aliases).reduce(
    (acc, [key, path]) => ({
      ...acc,
      [key]: resolve(__dirname, `../${path}`),
    }),
    {},
  );
export default formatAliases;
