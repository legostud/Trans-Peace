import { useEffect, useState, useRef } from "react";

export default function useClickAway(props) {
  const { isOpen, setOpen, ref } = props;

  const fallbackRef = useRef();
  const dropdownRef = ref || fallbackRef;

  // if the click originated inside, don't close it when the "click" event
  // happens outside
  const [clickStartedInside, setClickStartedInside] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const handleClickAway = (e) => {
        if (
          !isOrContainsNode(dropdownRef.current, e.target) &&
          !clickStartedInside
        ) {
          setOpen(false);
        }

        setClickStartedInside(false); // reset
      };

      const handleKeydown = (e) => {
        if (e.key === "Esc" || e.key === "Escape") {
          setOpen(false);
        }
      };

      const handleMouseDown = (e) => {
        if (isOrContainsNode(dropdownRef.current, e.target)) {
          setClickStartedInside(true);
        }
      };

      document.addEventListener("click", handleClickAway, true);
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("mousedown", handleMouseDown);

      return () => {
        document.removeEventListener("click", handleClickAway, true);
        document.removeEventListener("keydown", handleKeydown);
        document.removeEventListener("mousedown", handleMouseDown);
      };
    }
  }, [clickStartedInside, dropdownRef, isOpen, setOpen]);

  return dropdownRef;
}

/* https://github.com/downshift-js/downshift/blob/046e4abf4468fead3bf3adadb1352279532345ed/src/utils.js#L41-L48*/
/**
 * @param {HTMLElement} parent the parent node
 * @param {HTMLElement} child the child node
 * @return {Boolean} whether the parent is the child or the child is in the parent
 */
function isOrContainsNode(parent, child) {
  return (
    !parent || parent === child || (parent.contains && parent.contains(child))
  );
}
