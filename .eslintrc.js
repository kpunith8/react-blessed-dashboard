module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn", // 0 - off, 1 - warn, 2 - error
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    process: false,
    require: false,
    module: false,
  },

  // It overrides these path and applies these lint rules
  // overrides: [
  //   {
  //     files: ["**/*.spec.js", "**/spec/**/*"],
  //     rules: {
  //       "react/display-name": ["off"],
  //       "no-undef": 0,
  //       "no-unused-expressions": 0,
  //     },
  //   },
  // ],
};
