import { string } from "prop-types";
import cn from "classnames";

import Button from "../Button/Button";

const propTypes = {
  href: string,
  text: string,
  className: string,
};

const SkipLink = (props) => {
  const { href = "#main-content", text = "Skip to Content", className } = props;

  return (
    <div className={cn("skip-link", className)}>
      <Button href={href} size="sm" asLink={true} isHidden={true}>
        {text}
      </Button>
    </div>
  );
};

SkipLink.propTypes = propTypes;
export default SkipLink;
