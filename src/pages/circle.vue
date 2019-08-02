<template>
  <div class="page-circle">
    <fast-map
      ref="map"
      mid="circle"
      :zoom="15"
      :center="[121.472644, 31.231049]"
      :double-click-zoom="false"
      @complete="handleComplete"
    >
      <fast-circle
        draggable
        ref="circle"
        mid="circle"
        fill-color="#1791fc"
        stroke-color="#FF33FF"
        stroke-style="dashed"
        :options="circleOptions"
        :radius="200"
        :z-index="50"
        :fill-opacity="0.4"
        :stroke-weight="6"
        :border-weight="3"
        :stroke-opacity="0.2"
        :stroke-dasharray="[10, 10]"
        @click="handlecircleClick"
      ></fast-circle>
      <button style="pointer-events: auto" @click="rerenderCircle">
        渲染 200 个
      </button>
      <button style="pointer-events: auto;" @click="getAllCircles">
        获取组件所有 circle
      </button>
      <button style="pointer-events: auto;" @click="removeCircles">
        删除一组 circle
      </button>
      <button style="pointer-events: auto;" @click="clearAll">
        删除所有 circle
      </button>
      <button style="pointer-events: auto;" @click="findCircle">
        查询指定 circle
      </button>
      <button style="pointer-events: auto" @click="findCircles">
        查询 circle 数组
      </button>
      <button style="pointer-events: auto" @click="hideCircles">
        隐藏组件所有 circle
      </button>
      <button style="pointer-events: auto" @click="showCircles">
        显示组件所有 circle
      </button>
      <button style="pointer-events: auto" @click="addCircles">
        添加 circle 数组
      </button>
    </fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello fast amap',
      circleOptions: [
        {
          myData: 123,
          radius: 500,
          center: [121.442644, 31.231049]
        }
      ]
    }
  },

  methods: {
    handleComplete() {
      console.log('map complete', this.$refs.map.getMapInstance())
    },

    findCircles() {
      const list = this.$refs.circle.getInstanceByProps('myData', [1, 2])
      console.log(list)
    },

    clearAll() {
      this.$refs.circle.clearAll()
    },

    hideCircles() {
      this.$refs.circle.hideAll()
    },

    showCircles() {
      this.$refs.circle.showAll()
    },

    addCircles() {
      const options = [
        {
          myData: 991,
          center: [121.472644, 31.231049]
        },
        {
          myData: 992,
          center: [121.472644, 31.231049]
        }
      ]
      this.$refs.circle.addCircles(options)
    },

    removeCircles() {
      const instance = this.$refs.circle
      const circles = instance.getInstanceByProps('myData', [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ])
      instance.removeCircles(circles, 'myData')
    },

    findCircle() {
      const instance = this.$refs.circle.getInstanceByProp('myData', 1)
      console.log(instance)
    },

    getAllCircles() {
      console.log(this.$refs.circle.getAll())
    },

    handlecircleClick(event) {
      console.log('handlecircleClick', event.target.dataOptions)
    },

    createOptions() {
      const options = []
      const xList = [121.43, 121.435, 121.44, 121.445, 121.44]
      const yList = [31.229, 31.2295, 31.23, 31.2295, 31.23]
      for (var i = 0; i < 100; i++) {
        let num = 0.001 * (Math.random() * i)
        const x = parseInt(Math.random() * 5)
        options.push({
          myData: i,
          center: [xList[x] + num / 3, yList[x] + num / 6]
        })
      }
      return options
    },

    rerenderCircle() {
      const list = this.createOptions()
      this.circleOptions = list
    }
  }
}
</script>
