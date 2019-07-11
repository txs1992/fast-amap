import FastText from './text'

FastText.install = function(Vue) {
  Vue.component(FastText.name, FastText)
}

export default FastText
