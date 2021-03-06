module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    parser: "babel-eslint"
  },
  plugins: ["vue"],
  rules: {
    "no-console": "off"
  }
};
