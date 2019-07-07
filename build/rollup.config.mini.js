import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'packages/index.js',
  output: {
    file: 'lib/fast-amap.mini.js',
    format: 'umd',
    name: 'FastAMap'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    vue(),
    commonjs(),
    postcss({
      extensions: ['.css', '.scss']
    }),
    terser()
  ]
}
