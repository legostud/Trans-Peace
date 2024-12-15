import MainLayout from "@/js/components/MainLayout/MainLayout.jsx";
import mockData from "@/js/components/MainLayout/MainLayout.mock.js";

export default {
  title: "Pages/Main Layout",
  component: MainLayout,
  args: mockData,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {};
