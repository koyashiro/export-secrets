import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["dist/", "coverage/"] },
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
