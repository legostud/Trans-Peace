import { node } from "prop-types";

import SkipLink from "../SkipLink/SkipLink.jsx";

const propTypes = {
  children: node,
};

const MainLayout = (props) => {
  const { children } = props;

  const content = children || (
    <p>
      Trans peace is an activist organization fighting for the rights of the
      transgender community. We do this through educational out-reach programs
      and events
    </p>
  );

  return (
    <div className="js-site-content main-layout">
      <header className="main-layout__header">
        <div className="main-layout__header-logo">
          <img
            srcSet="/assets/img/logo.jpg 300w, /assets/img/logo-sm.jpg 150w"
            sizes="150px"
            width="300"
            height="198"
            alt="Trans Peace"
          />
        </div>
        <h1>Trans Peace</h1>
        <SkipLink />
      </header>
      <main tabIndex="-1" id="main-content">
        {content}
      </main>
      <footer className="main-layout__footer">Copyright 2024</footer>
    </div>
  );
};

MainLayout.propTypes = propTypes;
export default MainLayout;
