require("@babel/register")({
  presets: [["@babel/preset-env"], ["@babel/preset-react"]],
  plugins: ["@babel/plugin-transform-runtime"], // to use async/await
});

require("./dashboard.js");
