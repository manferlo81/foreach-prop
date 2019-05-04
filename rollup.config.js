import buble from "rollup-plugin-buble";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

import { main, module as esModule, browser, dependencies } from "./package.json";

const input = "src/index.js";
const sourcemap = true;
const deps = Object.keys(dependencies);

const configs = [
  { file: main, format: "cjs" },
  { file: esModule, format: "es" },
  { file: browser, format: "umd", name: "eachProp", isBrowser: true },
].map(({ isBrowser, ...partial }) => {

  const output = {
    ...partial,
    sourcemap,
    esModule: false,
    interop: false,
  };

  const external = isBrowser ? [] : deps;

  return {

    input,
    output,
    external,

    plugins: [

      resolve(),
      commonjs(),

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

    ],

  };

});

export default configs;
