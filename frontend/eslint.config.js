import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import { fileURLToPath } from 'url'
import { includeIgnoreFile } from '@eslint/compat'

const gitIgnorePath = fileURLToPath(new URL('.gitignore', import.meta.url))
const eslintIgnorePath = fileURLToPath(new URL('.eslintignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitIgnorePath),
  includeIgnoreFile(eslintIgnorePath),
  stylistic.configs.recommended,
  { files: ['**/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/prop-types': [0],
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0,
    },
  },
])