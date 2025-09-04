import { defineConfig } from 'bundlib'

export default defineConfig({
  esModule: true,
  interop: true,
  min: ['browser', 'module'],
  name: 'eachProp',
  project: './tsconfig.build.json',
})
