import { parseArgs, cleanCreateRoot } from "@/js/utils";
import Demo from "./Demo";

const renderDemo = (mount) => {
  let DemoRoot = null;
  DemoRoot = cleanCreateRoot(DemoRoot, mount);
  DemoRoot.render(<Demo {...parseArgs(mount.dataset)} />);
};

export default renderDemo;
