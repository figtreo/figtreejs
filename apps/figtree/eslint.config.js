import { defineConfig } from "eslint/config";
import defaultConfig  from "@figtreejs/eslint-config";
import onlyWarn from "eslint-plugin-only-warn";

export default defineConfig({
  "extends": [defaultConfig],

    plugins: {
      "only-warn": onlyWarn,
    },
  "rules":{
   "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }]
  }
})
