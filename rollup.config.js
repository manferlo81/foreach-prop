import buble from "rollup-plugin-buble";

import { main, module as esModule, dependencies } from "./package.json";

const sourcemap = true;

const input = "src/index.js";

const output = [
  { file: main, format: "cjs" },
  { file: esModule, format: "es" },
].map((partial) => ({
  ...partial,
  sourcemap,
  esModule: false,
  interop: false,
}));

const external = Object.keys(dependencies);

const config = {

  input,
  output,

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
