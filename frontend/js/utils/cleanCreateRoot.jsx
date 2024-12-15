import ReactDOM from "react-dom/client";

const cleanCreateRoot = (root, mount) => {
  if (root !== null) {
    root.unmount();
    root = ReactDOM.createRoot(mount);
  } else {
    root = ReactDOM.createRoot(mount);
  }
  return root;
};

export default cleanCreateRoot;
