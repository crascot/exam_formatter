import { fileURLToPath } from "url";
import fs from "fs";
import path, { dirname } from "path";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prettierOptions = JSON.parse(
 fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"),
);

export default {
 files: ["src/**/*.{ts,tsx}"],
 languageOptions: {
  parser: tseslint.parser,
  parserOptions: {
   project: "./tsconfig.json",
   sourceType: "module",
  },
  globals: {
   ...globals.browser,
   ...globals.node,
  },
 },
 plugins: {
  react,
  prettier,
 },
 settings: {
  react: {
   version: "detect",
  },
 },
 rules: {
  ...js.configs.recommended.rules,
  ...tseslint.configs.recommended.rules,
  ...react.configs.recommended.rules,
  "no-var": "error",
  "react/react-in-jsx-scope": 0,
  "prettier/prettier": ["warn", prettierOptions],
  "no-unused-vars": "warn",
 },
};
