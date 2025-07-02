import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import eslintComments from "eslint-plugin-eslint-comments";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores([
    "dist",
    "eslint.config.js",
    "src/vite-env.d.ts",
    "automation",
  ]),
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.vite,
  {
    plugins: {
      "eslint-comments": eslintComments,
    },
    rules: {
      "eslint-comments/disable-enable-pair": "error",
      "eslint-comments/no-aggregating-enable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/no-unlimited-disable": "error",
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-unused-enable": "error",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2023,
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single", { avoidEscape: true }],
      "comma-dangle": ["error", "always-multiline"],
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-magic-numbers": [
        "warn",
        {
          ignore: [0, 1, 100, 500],
          ignoreArrayIndexes: true,
          enforceConst: true,
          detectObjects: false,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
]);
