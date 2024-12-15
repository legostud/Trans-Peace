import { string, oneOf, bool } from "prop-types";
import cn from "classnames";

import Icon from "../Icon/Icon";

/**
 * @typedef {'primary' | 'secondary' | 'icon'} ButtonVariant;
 * @typedef {'sm', | 'lg'} ButtonSize
 */

const BUTTON_VARIANTS = ["primary", "secondary", "icon"];
const BUTTON_SIZES = ["sm", "lg", "xl"];

export const propTypes = {
  variant: oneOf(BUTTON_VARIANTS).isRequired,
  size: oneOf(BUTTON_SIZES),
  type: oneOf(["button", "submit", "reset"]),
  children: string,
  icon: string, // must match an icon in @assets/img/icons
  disabled: bool,
  asLink: bool,
  href: string,
  className: string,
  target: string,
  styleClasses: string,
  isHidden: bool,
};

const defaultProps = {
  variant: "primary",
  size: "lg",
  type: "button",
  disabled: false,
};

/**
 *
 * @param {Object} options
 * @param {ButtonVariant} options.variant - Button variant
 * @param {ButtonSize} options.size - Button size
 * @returns {string} The generated class names
 */
export const getButtonClassNames = ({ variant, size }) => {
  if (!BUTTON_VARIANTS.includes(variant) || !BUTTON_SIZES.includes(size)) {
    console.warn("buttonVariants passed invalid variant or size");
    return "";
  }
  return cn(`btn--variant-${variant} btn--size-${size}`, {
    btn: variant !== "icon",
  });
};

const BUTTON_SIZE_TO_ICON_SIZE_MAP = Object.freeze({
  SM: 12,
  LG: 14,
  XL: 24,
});

const Button = (props) => {
  const {
    variant,
    size,
    children,
    disabled,
    type,
    icon,
    asLink,
    target,
    href,
    styleClasses,
    isHidden = false,
    ...passThrough
  } = props;

  if (!variant || !size) return null;

  const classes = getButtonClassNames({ variant, size });

  if (asLink && href) {
    return (
      <a
        className={cn(classes, styleClasses, {
          "visually-hidden": isHidden,
        })}
        href={href}
        target={target}
        {...passThrough}
      >
        {children}
        {icon ? (
          <Icon
            iconName={icon}
            size={BUTTON_SIZE_TO_ICON_SIZE_MAP[size.toUpperCase()]}
          />
        ) : null}
      </a>
    );
  }

  return (
    <button
      className={cn(classes, styleClasses)}
      disabled={disabled}
      type={type}
      {...passThrough}
    >
      {children}
      {icon ? (
        <Icon
          iconName={icon}
          size={BUTTON_SIZE_TO_ICON_SIZE_MAP[size.toUpperCase()]}
        />
      ) : null}
    </button>
  );
};

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;
export default Button;
