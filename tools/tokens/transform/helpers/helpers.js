import * as R from "ramda";

export const getBreakpoints = R.reduce((acc, item) => {
  return item.path.includes("breakpoints") ? [...acc, item.value] : acc;
}, []);

export const getStyles = R.compose(
  R.reject((item) => !item["mobile"] && !item["desktop"]),
  R.map(R.mergeAll),
  R.values(),
  R.groupBy(R.prop("name")),
  R.reduce((acc, prop) => {
    if (prop.type === "custom-fontStyle") {
      return [
        ...acc,
        R.compose(
          R.applySpec({
            name: R.compose(R.last, R.prop("path")),
            type: R.prop("type"),
            path: R.compose(R.join(", "), R.prop("path")),
            //conditionally add media query styles
            ...(R.includes("mobile", R.prop("path")(prop)) && {
              400: R.compose(
                R.when(
                  () => R.includes("mobile", R.prop("path")),
                  R.prop("value"),
                ),
              ),
            }),
            ...(R.includes("desktop", R.prop("path")(prop)) && {
              desktop: R.compose(
                R.when(
                  () => R.includes("desktop", R.prop("path")),
                  R.prop("value"),
                ),
              ),
            }),
          }),
        )(prop),
      ];
    }
    return acc;
  }, []),
);
