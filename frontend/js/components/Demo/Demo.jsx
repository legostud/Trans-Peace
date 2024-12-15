import { propTypes, defaultProps } from "./Demo.propTypes";
import cx from "classnames";
import "./demo.scss";
const Demo = (props) => {
  const {
    title,
    description,
    theme,
    opacity,
    lazy,
    imgSrc,
    imgAlt,
    paddingTop,
    paddingBottom,
  } = props;

  return (
    <div
      className={cx("demo", {
        [`${theme}`]: theme,
        [`${paddingTop}`]: paddingTop,
        [`${paddingBottom}`]: paddingBottom,
      })}
    >
      {opacity > 0 && (
        <div className={cx("demo__overlay", [`opacity-${opacity}`])}></div>
      )}
      <div className="demo__content">
        <div className="demo__col">
          <h2>{title}</h2>
          <div>{description}</div>
        </div>
        <div className="demo__col">
          <img src={imgSrc} loading={lazy ? "lazy" : "eager"} alt={imgAlt} />
        </div>
      </div>
    </div>
  );
};

Demo.defaultProps = defaultProps;
Demo.propTypes = propTypes;
export default Demo;
