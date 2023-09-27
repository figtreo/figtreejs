import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import replace from '@rollup/plugin-replace';

const packageJson = require("./package.json");

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'production' ),
        preventAssignment:true
      })
    ],
    // external: ["react", "react-dom", "styled-components"], // the hope is this includes react in the bundle
    external: [ "styled-components"],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "./dist/index.d.ts", format: "es" }],
    plugins: [dts.default()],
  },
];
