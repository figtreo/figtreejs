
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';



export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked, 
  {   

    languageOptions: {
      parserOptions: {
        projectService: true,
        allowDefaultProject: true
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
        // 'vitest/no-focused-tests': 'error',
    },
  } 
)
