import { useEffect, useState, useCallback, useRef } from "react";
import debounce from "lodash.debounce";

/**
 * useBoundingClientRect
 * given an element, return the dimensions.
 * see https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
 * @param {Object} refProp optional, a ref provided by the consumer. If this isn't
 *  provided, a fallbackRef will be used instead
 * @return {Tuple} [dimensions, ref]
 * @type dimensions is { width, height, top, right, bottom, left } of the element
 *
 * const [{ width, height}, containerRef] = useBoundingClientRect();
 */
export default function useBoundingClientRect(refProp) {
  const [dimensions, setDimensions] = useState({});
  const fallbackRef = useRef();
  const ref = refProp || fallbackRef;

  const measure = useCallback(() => {
    if (ref.current) {
      // NOTE IE does not support toJSON
      // setDimensions(ref.current.getBoundingClientRect().toJSON());
      setDimensions(ref.current.getBoundingClientRect());
    } else {
      setDimensions({});
    }
  }, [ref]);

  // call measure when it changes and on mount
  useEffect(() => {
    measure();
  }, [measure]);

  // trigger a measure right before the user prints
  useEffect(() => {
    // using matchMedia instead of onbeforeprint https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeprint#Polyfill
    const mediaQueryList = window.matchMedia("print");

    const handleMediaChange = (mql) => {
      if (mql.matches) {
        measure();
      }
    };
    mediaQueryList.addListener(handleMediaChange);

    return () => {
      mediaQueryList.removeListener(handleMediaChange);
    };
  }, [measure]);

  // measure after resize or scroll
  // we need to remeasure on scroll too, because top will change
  useEffect(() => {
    const measureDebounce = debounce(measure, 100);

    window.addEventListener("scroll", measureDebounce);
    window.addEventListener("resize", measureDebounce);

    return () => {
      measureDebounce.cancel();
      window.removeEventListener("scroll", measureDebounce);
      window.removeEventListener("resize", measureDebounce);
    };
  }, [measure]);

  return [dimensions, ref];
}
