/**
 * .eslintrc.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
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
    parser: "@typescript-eslint/parser", // Asegúrate de utilizar el parser correcto
  },
  plugins: [
    "@typescript-eslint", // Añade el plugin de TypeScript
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn", // Puedes ajustar esto a "error" si prefieres que sea un error
      { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
    ],
  },
};
