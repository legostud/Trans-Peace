import SkipLink from "./SkipLink.jsx";

export default {
  title: "Base/Skip Link",
  component: SkipLink,
};

export const Default = () => (
  <div>
    <div tabIndex="-1">Hit tab to see me</div>
    <SkipLink />
  </div>
);
