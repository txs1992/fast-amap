import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'packages/index.js',
  output: {
    file: 'lib/fast-amap.js',
    format: 'umd',
    name: 'FastAMap'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      browser: true
    }),
    commonjs(),
    postcss({
      extensions: ['.css', '.scss']
    })
  ]
}
