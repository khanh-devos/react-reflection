import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: "json" };


import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from "@rollup/plugin-terser";

export default [
  {
    input: "src/index.ts",
    
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
      // NEW For optimizing
      peerDepsExternal(),

      resolve(),
      commonjs(),

      typescript({ 
        exclude: ["src/components/tests"],
        tsconfig: "./tsconfig.json",
      }),

      // NEW For optimizing
      terser(), 

    ],
  },

  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },

];