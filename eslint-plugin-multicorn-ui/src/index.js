const noUiJargon = require("./no-ui-jargon");

module.exports = {
  rules: {
    "no-ui-jargon": noUiJargon,
  },
  configs: {
    recommended: {
      plugins: ["multicorn-ui"],
      rules: {
        "multicorn-ui/no-ui-jargon": "warn",
      },
    },
    strict: {
      plugins: ["multicorn-ui"],
      rules: {
        "multicorn-ui/no-ui-jargon": "error",
      },
    },
  },
};
