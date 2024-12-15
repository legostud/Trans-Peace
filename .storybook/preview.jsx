 import "./velirDomContentLoadedFix";
 import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
 
 const site = import.meta.env.VITE_SITE || "frontend";

import( `../${site}/scss/index.scss`);
import( `../${site}/js/index.js`);

 const preview  = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      // https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
      storySort: {
        method: "alphabetical",
        order: ["Welcome", "Prototypes", "Components", "Base"],
      },
    },

    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },

  },
};

export default preview;
