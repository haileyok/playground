module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ['prettier'],
  rules: {
    "@typescript-eslint/quotes": [2, "single", { avoidEscape: true }],
    "@typescript-eslint/comma-dangle": [2, "always-multiline"],
    "@typescript-eslint/semi": [2, "never"],
    "@typescript-eslint/member-delimiter-style": [
      2,
      {
        multiline: {
          delimiter: "comma",
          requireLast: true,
        },
        singleline: {
          delimiter: "comma",
          requireLast: true,
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: "none",
              requireLast: true,
            },
          },
        },
      },
    ],
    "@typescript-eslint/consistent-type-definitions": [1, "interface"],
    "@typescript-eslint/consistent-type-imports": [
      2,
      { prefer: "no-type-imports" },
    ],
    "@typescript-eslint/space-before-function-paren": [
      2,
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": 'off',
    "prettier/prettier": [
      2,
      {
        endOfLine: "auto",
        singleQuote: true,
        semi: false,
        bracketSpacing: true,
        trailingComma: "all",
        tabWidth: 2,
        printWidth: 80,
      },
    ],
  },
};
