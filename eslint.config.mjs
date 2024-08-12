import pluginJs from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import { config, configs } from 'typescript-eslint';

const rule = (options) => ['error', options];

const pluginRules = (pluginName, rules) => Object.keys(rules).reduce((output, ruleName) => {
  const value = rules[ruleName];
  const pluginRuleName = `${pluginName}/${ruleName}`;
  return ({ ...output, [pluginRuleName]: value });
}, {});

const typescriptFlatConfig = config(
  ...configs.strictTypeChecked,
  ...configs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } } },
  { files: ['*.{js,cjs,mjs}'], ...configs.disableTypeChecked },
);

const stylisticRules = pluginRules('@stylistic', {
  'semi': rule('always'),
  'padded-blocks': 'off',
  'arrow-parens': rule('always'),
});

export default config(
  { ignores: ['dist', 'coverage'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...typescriptFlatConfig,
  stylistic.configs['recommended-flat'],
  { rules: { ...stylisticRules } },
);
