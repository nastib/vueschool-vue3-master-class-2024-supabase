import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default defineConfigWithVueTs([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/supabase.backup/**',
      '**/components/ui/**',
      'typed-router.d.ts',
      '**/lib/utils.ts'
    ]
  },
  ...pluginVue.configs[('flat/essential', 'flat/recommended')],
  skipFormatting,
  {
    // Add your custom ESLint rules here
    rules: {
      // Example: Disable multi-word component names rule
      'vue/multi-word-component-names': 0,
      // Add TypeScript-specific rules here
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'vue/require-default-prop': 0
    },
    languageOptions: {
      parser: vueParser, // Use vue-eslint-parser for .vue files
      parserOptions: {
        parser: tsParser, // Explicitly set the parser
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin // Explicitly define the plugin
    }
  },
  ...(Array.isArray(vueTsConfigs) ? vueTsConfigs : [])
])
