import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    ...pluginJs.configs.recommended, // ESLint's recommended JavaScript rules
    ...pluginReact.configs.flat.recommended, // React rules for flat config
    ...prettierConfig, // Prettier rules for code formatting
  },
];
