import buble from "rollup-plugin-buble";

import { main, module as esModule, dependencies } from "./package.json";

const input = "src/index.js";
const sourcemap = true;

/** @type { import("rollup").OutputOptions } */
const cjsOutput = {
  file: main,
  format: "cjs",
  interop: false,
  sourcemap,
};

/** @type { import("rollup").OutputOptions } */
const esOutput = {
  file: esModule,
  format: "es",
  sourcemap,
};

const external = Object.keys(dependencies);

/** @type { import("rollup").RollupOptions } */
const config = {

  input,
  output: [cjsOutput, esOutput],

  external,

  plugins: [
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

export default config;
