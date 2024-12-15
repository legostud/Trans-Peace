import "vite/modulepreload-polyfill";
// import { onLCP, onFID, onCLS } from "web-vitals/attribution";
import { dynamicRenderer } from "./utils";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    dynamicRenderer([
      /* PLOP_INDEX_IMPORT */
      // { selector: ".js-icon", name: "components/Icon/Icon.render.jsx" },
    ]);
    // onCLS(console.log);
    // onFID(console.log);
    // onLCP(console.log);
  },
  false,
);
