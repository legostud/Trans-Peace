import Demo from "./Demo";
import mockData from "./Demo.mockData";
import { setArgs, setArgTypes } from "@/.storybook/helpers";

export const demo = (args) => <Demo {...setArgs(args)} />;
demo.args = mockData;

export default {
  title: "Components/Demo",
  component: Demo,
  tags: ["autodocs"],
  argTypes: setArgTypes(mockData),
};
