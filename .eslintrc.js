/**
 * .eslintrc.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "plugin:@typescript-eslint/recommended", // Agrega esta línea para incluir las reglas recomendadas de TypeScript
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    extraFileExtensions: [".vue"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint", // Añade el plugin de TypeScript
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-types": "warn",
  },
};
