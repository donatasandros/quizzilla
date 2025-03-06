import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslintConfigPrettier,
  {
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      "no-shadow": "off",
      "import/no-cycle": "warn",
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: [
            "builtin",
            "external",
            "type",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
          ],
          alphabetize: {
            order: "asc",
          },
        },
      ],
    },
  },
];

export default eslintConfig;
