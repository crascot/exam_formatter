import { fileURLToPath } from "url";
import fs from "fs";
import path, { dirname } from "path";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prettierOptions = JSON.parse(
 fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"),
);

export default [
 {
  ignores: ["node_modules", "dist"],
  files: ["src/**/*.ts"],
  languageOptions: {
   parser: tseslint.parser,
   parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
   },
   globals: {
    ...globals.node,
   },
  },
  plugins: {
   prettier,
  },
  rules: {
   ...js.configs.recommended.rules,
   ...tseslint.configs.recommended.rules,
   "no-var": "error",
   "prettier/prettier": ["warn", prettierOptions],
   "no-unused-vars": "warn",
  },
 },
];
