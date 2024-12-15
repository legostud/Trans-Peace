import { string, oneOf, number, oneOfType } from "prop-types";
import classnames from "classnames";

export const propTypes = {
  iconName: string.isRequired, // must match a file name in @assets/img/icons
  title: string,
  className: string,
  size: oneOfType([oneOf(["xs", "sm", "md", "lg", "xl"]), number]),
};

/**
 * Size pixel values
 */
const SIZES = Object.freeze({
  XS: 16,
  SM: 24,
  MD: 32,
  LG: 48,
  XL: 64,
});

const Icon = (props) => {
  const { iconName, title, size, className, ...otherProps } = props;

  if (!iconName) return null;

  let sizeInPixels;
  if (typeof size === "string") {
    const sizeUpperCased = size.toUpperCase();
    sizeInPixels = SIZES[sizeUpperCased];
  } else if (typeof size === "number") {
    sizeInPixels = size;
  }

  return (
    <svg
      focusable="false"
      aria-label={title}
      aria-hidden={title ? null : true}
      role={title ? "img" : null}
      height={sizeInPixels}
      width={sizeInPixels}
      className={classnames("pew-icon", className, {
        [`pew-icon--${size}`]: typeof size === "string",
      })}
      style={{ ["--icon-size"]: typeof size === "number" ? size : null }}
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <use
        aria-hidden="true"
        xlinkHref={`${
          window.assetsFolder || "/img"
        }/svg-sprite.svg#${iconName}`}
      ></use>
    </svg>
  );
};

Icon.propTypes = propTypes;
export default Icon;
