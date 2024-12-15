export default {
  type: "value",
  matcher: function (token) {
    return token.type === "custom-transition";
  },
  transformer: (token) => {
    if (
      token.value.easingFunction &&
      token.value.easingType === "cubicBezier"
    ) {
      const { x1, x2, y1, y2 } = token.value.easingFunction;
      return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
    }
    return token;
  },
};
