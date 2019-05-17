import { dirname } from "path";
import typescript from "typescript";

import buble from "rollup-plugin-buble";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import ts from "rollup-plugin-typescript2";

import { main, module as esModule, browser, types, dependencies } from "./package.json";

const input = "src/index.ts";
const sourcemap = true;
const deps = Object.keys(dependencies);
const typesDir = dirname(types);

const configs = [
  { file: main, format: "cjs" },
  { file: esModule, format: "es", typesDir },
  { file: browser, format: "umd", name: "eachProp", isBrowser: true },
].map(({ isBrowser, typesDir, ...partial }) => {

  /** @type { import("rollup").OutputOptions } */
  const output = {
    ...partial,
    sourcemap,
    esModule: false,
    interop: false,
  };

  const external = isBrowser ? [] : deps;

  const plugins = [

    resolve(),
    commonjs(),

    ts({
      cacheRoot: ".cache/rpt2",
      typescript,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: sourcemap,
          declaration: !!typesDir,
          declarationDir: typesDir,
        },
      },
    }),

    buble({
      target: {
        node: 0.12,
        ie: 8,
        chrome: 48,
        firefox: 43,
        safari: 8,
        edge: 12,
      },
    }),

  ];

  /** @type { import("rollup").RollupOptions } */
  const config = {

    input,
    output,
    external,

    plugins,

  };

  return config;

});

export default configs;
