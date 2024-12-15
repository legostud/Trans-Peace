import * as R from "ramda";

export const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion)",
).matches;
// Element -> Number
export function getOffsetTop(element) {
  if (!element) {
    return 0;
  }

  const { top } = element.getBoundingClientRect();
  const scrollTop = getScrollTop();
  return top + scrollTop;
}

// String -> Number
const getOffsetTopById = (id) => {
  try {
    return R.compose(
      (top) => top - getHeaderHeight(),
      getOffsetTop,
      (id) => document.getElementById(`#${id}`),
      R.replace("#", ""),
    )(id);
  } catch (e) {
    // probably a bad id
  }
};

// cross browser schinanigans
export function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop;
}

export function scrollTo(offset, callback) {
  if (typeof callback === "function") {
    const fixedOffset = offset > 0 ? offset.toFixed() : Number(0).toFixed();
    const onScroll = function () {
      if (window.pageYOffset.toFixed() === fixedOffset) {
        window.removeEventListener("scroll", onScroll);
        callback();
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  window.scroll({
    top: offset,
    left: 0,
    behavior: prefersReducedMotion ? "instant" : "smooth",
  });
}

// () -> Number
function getHeaderHeight() {
  const nav = document.querySelector(".js-global-header");
  const navPos = nav && window.getComputedStyle(nav).position;
  return nav && navPos === "sticky" ? nav.getBoundingClientRect().height : 0;
}

export function scrollToId(el) {
  const id = el.replace("#", "");
  scrollTo(getOffsetTopById(id), () => {
    setTimeout(() => {
      document
        .getElementById(id)
        .focus({ preventScroll: true, focusVisible: true });
    }, 1000);
  });
}
