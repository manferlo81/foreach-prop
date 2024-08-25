import pluginJs from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import { config, configs as typescriptConfigs } from 'typescript-eslint';

const rule = (options) => ['error', options];

const pluginRules = (pluginName, rules) => Object.keys(rules).reduce((output, ruleName) => {
  const value = rules[ruleName];
  const pluginRuleName = `${pluginName}/${ruleName}`;
  return ({ ...output, [pluginRuleName]: value });
}, {});

const eslintRules = {
  'no-useless-rename': 'error',
  'object-shorthand': 'error',
};

const stylisticRules = pluginRules('@stylistic', {
  semi: rule('always'),
  quotes: rule('single'),
  'linebreak-style': rule('unix'),
  'quote-props': rule('as-needed'),
  'arrow-parens': rule('always'),
  'padded-blocks': 'off',
});

const typescriptFlatConfig = config(
  ...typescriptConfigs.strictTypeChecked,
  ...typescriptConfigs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } } },
  { files: ['*.{js,cjs,mjs}'], ...typescriptConfigs.disableTypeChecked },
);

export default config(
  { ignores: ['dist', 'coverage'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  stylistic.configs['recommended-flat'],
  ...typescriptFlatConfig,
  { rules: { ...eslintRules, ...stylisticRules } },
);
