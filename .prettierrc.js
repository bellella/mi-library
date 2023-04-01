module.exports = {
  semi: true,
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: false,
  bracketSameLine: true,
  useTabs: false,
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.d.ts',
      options: {
        // This is needed for TypeScript 3.2 support
        trailingComma: 'es5',
      },
    },
  ],
  importOrder: [
    '^react(.*)$',
    '^@tanstack/(.*)$',
    '^@ionic/(.*)$',
    '^@foris/(.*)$',
    '^@un7qi3-design/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: false,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ["jsx", "typescript", "decorators-legacy"]
};