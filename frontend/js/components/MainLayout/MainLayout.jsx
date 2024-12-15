import { string } from "prop-types";

import SkipLink from "../SkipLink/SkipLink.jsx";

const propTypes = {};

const MainLayout = (props) => {
  const { children = "Main Layout" } = props;

  return (
    <div className="js-site-content">
      <header className="layout-header">
        <SkipLink />
      </header>
      <main tabIndex="-1" id="main-content">
        {children}
      </main>
      <footer className="layout-footer"></footer>
    </div>
  );
};

MainLayout.propTypes = propTypes;
export default MainLayout;
