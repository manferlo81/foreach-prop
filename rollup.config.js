import buble from "rollup-plugin-buble";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { ts, dts } from "rollup-plugin-dts";
import removeEmptyLines from "./plugins/remove-empty-lines";
import unexport from "./plugins/unexport";

import { main, module as esModule, browser, types, dependencies } from "./package.json";

const input = "src/index.ts";
const sourcemap = true;
const deps = Object.keys(dependencies);

const configs = [
  { file: main, format: "cjs" },
  { file: esModule, format: "es" },
  { file: browser, format: "umd", name: "eachProp", isBrowser: true },
  { file: types, format: "es", types: true },
].map(({ isBrowser, types, ...partial }) => {

  /** @type { import("rollup").OutputOptions } */
  const output = {
    ...partial,
    sourcemap: !types && sourcemap,
    esModule: false,
    interop: false,
  };

  const external = isBrowser ? [] : deps;

  const plugins = types
    ? [

      resolve(),
      commonjs(),

      dts({ banner: false }),

      removeEmptyLines(),
      unexport("Key", "Extra"),

    ]
    : [

      resolve(),
      commonjs(),

      ts({ banner: false }),

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
