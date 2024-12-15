export default {
  type: "value",
  matcher: (token) => {
    return token.type === "custom-grid";
  },
  transformer: (token) => {
    const { value } = token;
    console.log("grid", token);
    return `${JSON.stringify(value)}`;
  },
};
