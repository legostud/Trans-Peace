import Icon from "./Icon.jsx";

export default {
  title: "Base/Icon",
  component: Icon,
  args: {
    title: "Search",
    iconName: "search",
  },
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: {
        type: "radio",
        labels: {
          xs: "Extra Small",
          sm: "Small",
          md: "Medium",
          lg: "Large",
          xl: "Extra Large",
        },
      },
    },
    className: {
      control: "text",
    },
  },
};

export const Small = {
  args: {
    size: "sm",
  },
};

export const Medium = {
  args: {
    size: "md",
  },
};

export const Large = {
  args: {
    size: "lg",
  },
};

export const ExtraLarge = {
  args: {
    size: "xl",
  },
};

export const WithNonStandardSize = {
  args: {
    size: 200,
  },
};
