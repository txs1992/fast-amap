import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'

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
    commonjs(),
    postcss({
      extensions: ['.css', '.scss']
    })
  ]
}
