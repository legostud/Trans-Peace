import { string, oneOf, bool, arrayOf, shape } from "prop-types";
/* Add Global proptypes*/

export const bgColorPropType = {
  theme: oneOf([
    "theme-blue",
    "theme-white",
    "theme-charcoal",
    "theme-linticular-dark",
    "theme-linticular-light",
  ]),
};

export const bgImgLgPropType = {
  backgroundImgLg: string,
};

export const bgImgMdPropType = {
  backgroundImgMd: string,
};

export const bgImgSmPropType = {
  backgroundImgSm: string,
};

export const bgImgPropTypes = {
  ...bgImgLgPropType,
  ...bgImgMdPropType,
  ...bgImgSmPropType,
};

export const marginTopPropType = {
  marginTop: oneOf([
    "mt-0-clamp",
    "mt-xs-clamp",
    "mt-sm-clamp",
    "mt-lg-clamp",
    "mt-xl-clamp",
  ]),
};

export const marginBottomPropType = {
  marginBottom: oneOf([
    "mb-0-clamp",
    "mb-xs-clamp",
    "mb-sm-clamp",
    "mb-lg-clamp",
    "mb-xl-clamp",
  ]),
};

export const paddingTopPropType = {
  paddingTop: oneOf([
    "pt-0-clamp",
    "pt-xs-clamp",
    "pt-sm-clamp",
    "pt-lg-clamp",
    "pt-xl-clamp",
  ]),
};

export const paddingBottomPropType = {
  paddingBottom: oneOf([
    "pb-0-clamp",
    "pb-xs-clamp",
    "pb-sm-clamp",
    "pb-lg-clamp",
    "pb-xl-clamp",
  ]),
};

export const marginPropTypes = {
  ...marginTopPropType,
  ...marginBottomPropType,
};

export const paddingPropTypes = {
  ...paddingTopPropType,
  ...paddingBottomPropType,
};

export const allSpacingPropTypes = {
  ...marginPropTypes,
  ...paddingPropTypes,
};

export const linkPropTypes = {
  href: string,
  target: string,
  className: string,
  text: string,
  type: oneOf(["internal", "external"]),
  download: bool,
};

export const picturePropTypes = {
  defaultImage: string,
  alt: string,
  sources: arrayOf(shape({ media: string, srcset: string, sizes: string })),
  classNames: shape({
    root: string,
    image: string,
  }),
};
