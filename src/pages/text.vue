<template>
  <div class="page-marker">
    <fast-map
      :mid="13"
      ref="map"
      :zoom="15"
      :options="options"
      :center="[121.472644, 31.231049]"
      :double-click-zoom="false"
    >
      <fast-text
        draggable
        clickable
        ref="text"
        text="纯文本标记"
        anchor="center"
        :mid="13"
        :angle="10"
        :offset="[-13, -30]"
        :options="textOptions"
        :style-option="styleOption"
        @click="handleTextClick"
      ></fast-text>
      <button style="pointer-events: auto" @click="renderTexts">
        重新渲染 text 组件
      </button>
      <button style="pointer-events: auto" @click="clearAll">
        清除 text 组件
      </button>
      <button style="pointer-events: auto" @click="removeTexts">
        删除一组 text 实例
      </button>
      <button style="pointer-events: auto" @click="findText">
        查找一个 text 实例
      </button>
      <button style="pointer-events: auto" @click="findTextList">
        查找一组 text 实例
      </button>
      <button style="pointer-events: auto" @click="hideAll">
        隐藏 text 组件实例
      </button>
      <button style="pointer-events: auto" @click="showAll">
        显示 text 组件实例
      </button>
      <button style="pointer-events: auto" @click="addTexts">
        添加一组 text 实例
      </button>
    </fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        height: 800,
        zooms: [3, 16]
      },
      styleOption: {
        padding: '.75rem 1.25rem',
        'margin-bottom': '1rem',
        'border-radius': '.25rem',
        'background-color': 'white',
        width: '15rem',
        'border-width': 0,
        'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
        'text-align': 'center',
        'font-size': '20px',
        color: 'blue'
      },
      textOptions: [
        {
          myData: 1,
          draggable: false,
          position: [121.452644, 31.231049]
        },
        {
          myData: 2,
          text: '纯文本标记2',
          position: [121.482644, 31.231049]
        }
      ]
    }
  },

  methods: {
    createOptions(count = 10) {
      const options = []
      for (let i = 0; i < count; i++) {
        let num = 0.001 * i
        options.push({
          myData: i,
          position: [121.452644 + num, 31.231049 + num]
        })
      }
      return options
    },

    clearAll() {
      this.$refs.text.clearAll()
    },

    showAll() {
      this.$refs.text.showAll()
    },

    hideAll() {
      this.$refs.text.hideAll()
    },

    addTexts() {
      const options = this.createOptions(10).slice(5)
      this.$refs.text.addTexts(options)
    },

    renderTexts() {
      const options = this.createOptions(4)
      this.textOptions = options
    },

    removeTexts() {
      const instance = this.$refs.text
      const texts = instance.getTextByProps('myData', [1, 2])
      instance.removeTexts(texts, 'myData')
    },

    findText() {
      console.log(this.$refs.text.getTextByProp('myData', 1))
    },

    findTextList() {
      console.log(this.$refs.text.getTextByProps('myData', [1, 2]))
    },

    handleClick() {
      console.log('handleClick', this.$refs.map.getMapInstance())
    },

    handleTextClick(event) {
      console.log('handleTextClick', event)
    },

    handleComplete() {
      this.$refs.map.getAMap().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
