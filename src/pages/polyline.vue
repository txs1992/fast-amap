<template>
  <div class="page-polygon">
    <fast-map
      v-cloak
      ref="map"
      mid="polyline"
      :zoom="4"
      :zooms="[3, 18]"
      :center="[121.472644, 31.231049]"
      @complete="handleComplete"
    >
      <fast-polyline
        geodesic
        draggable
        ref="polyline"
        mid="polyline"
        stroke-style="solid"
        stroke-color="#3366FF"
        :options="polylineOptions"
        :strokeWeight="6"
        :stroke-pacity="1"
        :double-click-zoom="false"
        :stroke-dasharray="[10, 5]"
      ></fast-polyline>
      <button style="pointer-events: auto" @click="renderPolyline">
        重新渲染一组
      </button>
      <button style="pointer-events: auto;" @click="getAll">
        获取组件所有 polyline
      </button>
      <button style="pointer-events: auto;" @click="removePolylines">
        删除一组 polyline
      </button>
      <button style="pointer-events: auto;" @click="removeAll">
        删除所有 polyline
      </button>
      <button style="pointer-events: auto;" @click="findPolyline">
        查询指定 polyline
      </button>
      <button style="pointer-events: auto" @click="findPolylines">
        查询 polyline 数组
      </button>
      <button style="pointer-events: auto" @click="hideAllPolylines">
        隐藏组件所有 polyline
      </button>
      <button style="pointer-events: auto" @click="showAllPolylines">
        显示组件所有 polyline
      </button>
      <button style="pointer-events: auto" @click="addPolylines">
        添加 polyline 数组
      </button>
    </fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello fast amap',
      polylineOptions: [
        {
          myData: 1,
          path: [['75.757904', '38.118117'], ['117.375719', '24.598057']]
        },
        {
          myData: 2,
          geodesic: false,
          path: [['77.757904', '35.118117'], ['127.375719', '34.598057']]
        }
      ]
    }
  },

  methods: {
    createOptions(num = 10) {
      const polylines = []
      for (let i = 0; i < num; i++) {
        const num = i * 5
        polylines.push({
          myData: i,
          geodesic: false,
          path: [
            [75.757904 + num, 38.118117 + i],
            [117.375719 + num, 24.598057 + i]
          ]
        })
      }
      return polylines
    },

    renderPolyline() {
      const options = this.createOptions()
      this.polylineOptions = options
    },

    removePolylines() {
      const polyline = this.$refs.polyline
      const list = polyline.getPolylineByProps('myData', [1, 2])
      polyline.removePolylines(list)
    },

    removeAll() {
      this.$refs.polyline.clearAll()
    },

    findPolyline() {
      console.log(this.$refs.polyline.getPolylineByProp('myData', 1))
    },

    findPolylines() {
      console.log(
        this.$refs.polyline.getPolylineByProps('myData', [1, 2, 3, 4])
      )
    },

    hideAllPolylines() {
      this.$refs.polyline.hideAll()
    },

    showAllPolylines() {
      this.$refs.polyline.showAll()
    },

    addPolylines() {
      const options = this.createOptions(5)
      this.$refs.polyline.addPolylines(options)
    },

    getAll() {
      console.log(this.$refs.polyline.getAllPolylines())
    },

    handleComplete() {
      console.log('map complete', this.$refs.map.getMapInstance())
    }
  }
}
</script>
