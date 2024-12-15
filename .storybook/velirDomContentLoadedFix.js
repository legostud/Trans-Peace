// We need to trigger DOMContentLoaded in a set timeout so we can execute any
// DOMContentLoaded handlers that are added in user scripts
const triggerDOMContentLoaded = () => {
  setTimeout(() => {
    window.document.dispatchEvent(
      new CustomEvent("DOMContentLoaded", {
        bubbles: true,
        cancelable: true,
      }),
    );
  }, 0);
}

// https://github.com/storybookjs/storybook/issues/6113#issuecomment-473965255
const handleGlobalDOMContentLoaded = () => {
  // trigger DOMContentLoaded when a story changes
  // As of storybook v6, this gets fired twice when a story changes (when the
  // story is removed, and again when the next is added), so only
  // triggerDOMContentLoaded when nodes are _added_
  const observer = new MutationObserver((mutationsList) => {
    for (let i = 0, len = mutationsList.length; i < len; i++) {
      if (
        mutationsList[i].type === "childList" &&
        mutationsList[i].addedNodes.length > 0
      ) {
        triggerDOMContentLoaded();
        break;
      }
    }
  });
  observer.observe(document.getElementById("storybook-root"), {
    childList: true,
    subtree: false,
  });

  // remove this listener so it's not called again by triggerDOMContentLoaded
  document.removeEventListener(
    "DOMContentLoaded",
    handleGlobalDOMContentLoaded,
  );
}
if (document.readyState === "complete" 
     || document.readyState === "loaded" 
     || document.readyState === "interactive") {
      handleGlobalDOMContentLoaded();

}else{
  document.addEventListener("DOMContentLoaded", handleGlobalDOMContentLoaded);

}

 

function myInitCode() { }
