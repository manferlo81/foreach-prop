import { config } from 'bundlib';

export default config({
  esModule: true,
  interop: true,
  min: ['browser', 'module'],
  name: 'eachProp',
  project: 'tsconfig-build.json',
});
