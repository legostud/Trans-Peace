export default {
  type: "value",
  matcher: (token) => {
    return token.type === "custom-fontStyle";
  },
  transformer: (token) => {
    const { value } = token;
    return `${value.fontStyle} ${value.fontVariant || "normal"} ${
      value.fontWeight
    } ${value.fontSize}px/${value.lineHeight}px '${value.fontFamily}'`;
  },
};
