export default [
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
      "no-unused-vars": 2,
      "max-len": [1, 100],
      "max-params": [2, 3]
    },
    ignores: ["dist/assets/*", "**/*.min.js", "/node_modules"],
  }
];
