let breakpoints = [];
export default {
  type: "value",
  matcher: (token) => {
    return (
      token.type === "dimension" &&
      token?.extensions?.["org.lukasoppermann.figmaDesignTokens"]?.exportKey ===
        "breakpoint"
    );
  },
  transformer: (token) => {
    const { value } = token;
    breakpoints.push({ name: token.name, value: token.value });
    console.log("bp", breakpoints);
    return `${JSON.stringify(value)}`;
  },
};
