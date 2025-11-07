import { defineConfig } from "eslint/config";
import defaultConfig  from "@figtree/eslint-config";

export default defineConfig({
  "extends": [defaultConfig],
  "rules":{
   "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }]
  }
})
