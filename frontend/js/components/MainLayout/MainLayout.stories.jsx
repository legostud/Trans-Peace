import MainLayout from "./MainLayout.jsx";
import mockData from "./MainLayout.mock.js";

export default {
  title: "Pages/Main Layout",
  component: MainLayout,
  args: mockData,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {};
