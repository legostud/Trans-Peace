const clampFunction = (props) => {
  const {
    maxFontSize,
    minFontSize,
    maxWidth,
    minWidth,
    isREM = false,
    rootFontSize = 16,
  } = props;
  const missingParams = Object.entries(props).reduce((message, parameter) => {
    const [key, value] = parameter;

    if (key === "isRem" || key === "rootFontSize") {
      return message;
    }

    if (!value) {
      return `${message.length ? `${message},` : ""} ${key} is missing`;
    }

    return message;
  }, "");

  if (missingParams.length) {
    throw Error(`Error: Parameters ${missingParams}`);
  }

  let slope, intersection;
  if (isREM) {
    slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
    intersection = -1 * minWidth * slope + minFontSize;

    return `${minFontSize}rem, ${intersection}rem + ${
      slope * 100
    }vw, ${maxFontSize}rem`;
  }
  let maxFontREM = maxFontSize / rootFontSize,
    minFontREM = minFontSize / rootFontSize,
    maxWidthREM = maxWidth / rootFontSize,
    minWidthREM = minWidth / rootFontSize;
  slope = (maxFontREM - minFontREM) / (maxWidthREM - minWidthREM);
  intersection = -1 * minWidthREM * slope + minFontREM;

  return `${minFontREM}rem, ${intersection}rem + ${
    slope * 100
  }vw, ${maxFontREM}rem`;
};

export default clampFunction;
