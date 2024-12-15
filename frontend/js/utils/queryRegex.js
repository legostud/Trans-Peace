import * as R from "ramda";

// common function (not exported) to split the query, and create the regex.
// the middle part has a different implementation whether we want to match
// all terms, or match any terms
const createQueryRegex = (processAndOrOr) =>
  R.compose(
    (query) => RegExp(query, "ig"),
    processAndOrOr,
    R.map(R.replace(/([^a-zA-Z0-9])/gi, "\\$1")),
    R.reject(R.equals("")),
    R.split(/\s+/),
  );

/**
 * usage:
 *  const queryRegex = createMatchAllQueryRegex("some query");
 *
 *   // will match is "some" _and_ "query" is in the test string
 *   queryRegex.test("title of something to search for")
 *
 * @param {String} query the query to match
 * @return {RegExp} regular expression
 */
export const createMatchAllQueryRegex = createQueryRegex(
  R.compose(
    R.join(""),
    R.map((query) => `(?=.*${query})`), // match all terms
  ),
);

/**
 * usage:
 *  const queryRegex = createMatchAnyQueryRegex("some query");
 *
 *   // will match is "some" _or_ "query" is in the test string
 *   queryRegex.test("title of something to search for")
 *
 *   see HighlightText.jsx for example
 *
 * @param {String} query the query to match
 * @return {RegExp} regular expression
 */
export const createMatchAnyQueryRegex = createQueryRegex(
  R.join("|"), // match any of the terms
);
