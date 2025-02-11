import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';
import external from "rollup-plugin-peer-deps-external";
import replace from '@rollup/plugin-replace';

// const packageJson = require("./package.json");
import packageJson from './package.json' with { type: 'json' };


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
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'dev' ),
        preventAssignment:true
      })
    ],
    external: ["react", "react-dom"], // the hope is this includes react in the bundle
    // external: [ "styled-components"],
  },
  {
    input: "./dist/esm/types/src/index.d.ts",
    output: [{ file: "./dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
