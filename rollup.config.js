import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'packages/index.js',
  output: {
    file: 'lib/index.js',
    format: 'umd',
    name: 'FastAMap'
  },
  plugins: [
    commonjs(),
    postcss({
      extensions: ['.css', '.scss']
    })
  ]
}
