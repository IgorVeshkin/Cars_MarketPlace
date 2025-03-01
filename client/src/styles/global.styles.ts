/// <reference types="@emotion/react/types/css-prop" />

export const GLOBAL_STYLES = {
  "*": {
    boxSizing: "border-box",
  } as const,
  "html, body, #root": {
    margin: 0,
    padding: 0,
    height: "100%",
  },
};
