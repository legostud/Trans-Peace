import Button from "./Button.jsx";

export default {
  title: "Base/Button",
  component: Button,
  args: {
    variant: "primary",
    size: "lg",
    children: "Button",
    type: "button",
  },
  argTypes: {
    size: {
      options: ["sm", "lg"],
      control: {
        type: "radio",
        labels: {
          sm: "Small",
          lg: "Large",
        },
      },
    },
    variant: {
      options: ["primary", "secondary"],
      control: {
        type: "radio",
        labels: {
          primary: "Primary",
          secondary: "Secondary",
        },
      },
    },
    icon: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    asLink: {
      control: "boolean",
    },
    href: {
      control: "text",
    },
    target: {
      options: ["_self", "_blank", "_parent", "_top"],
      control: {
        type: "radio",
      },
    },
  },
};

export const Small = {
  args: {
    size: "sm",
  },
};

export const Large = {
  args: {
    size: "lg",
  },
};

export const SmallWithIcon = {
  args: {
    size: "sm",
    icon: "arrow-forward-ios",
  },
};

export const LargeWithIcon = {
  args: {
    icon: "arrow-forward-ios",
  },
};

export const Link = {
  args: {
    asLink: true,
    target: "_blank",
    href: "https://google.com",
    icon: "arrow-forward-ios",
  },
};

export const IconButton = () => (
  <Button
    asLink
    href="https://google.com"
    variant="icon"
    aria-label="share on facebook"
    icon="facebook"
    size="xl"
  />
);
