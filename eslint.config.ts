
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const vitestPlugin = (await import('eslint-plugin-vitest')).default;


export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked, 
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { vitest: vitestPlugin },
    languageOptions: {
       globals: vitestPlugin.environments.env.globals,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
        'vitest/no-focused-tests': 'error',
    },
  }
)
