<template>
  <div class="page-polygon">
    <fast-map
      ref="map"
      mid="polygons"
      :zoom="15"
      :center="[121.472644, 31.231049]"
      :double-click-zoom="false"
      @complete="handleComplete"
    >
      <fast-polygon
        ref="polygon"
        draggable
        mid="polygons"
        :options="polygonoOptionsOne"
        :z-index="50"
        @click="handlePolygonClick"
      ></fast-polygon>
      <button style="pointer-events: auto" @click="rerenderPolygon">
        渲染 200 个
      </button>
      <button style="pointer-events: auto;" @click="getAllPolygons">
        获取组件所有 polygon
      </button>
      <button style="pointer-events: auto;" @click="removePolygons">
        删除一组 polygon
      </button>
      <button style="pointer-events: auto;" @click="clearAll">
        删除所有 polygon
      </button>
      <button style="pointer-events: auto;" @click="findPolygon">
        查询指定 polygon
      </button>
      <button style="pointer-events: auto" @click="findPolygons">
        查询 polygon 数组
      </button>
      <button style="pointer-events: auto" @click="hidePolygons">
        隐藏组件所有 polygon
      </button>
      <button style="pointer-events: auto" @click="showPolygons">
        显示组件所有 polygon
      </button>
      <button style="pointer-events: auto" @click="addPolygons">
        添加 polygon 数组
      </button>
    </fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello fast amap',
      polygonoOptionsOne: [
        {
          myData: 123,
          path: [
            [121.442644, 31.231049],
            [121.452644, 31.231049],
            [121.452644, 31.241049],
            [121.442644, 31.231049]
          ]
        }
      ],
      polygonoOptionsTwo: [
        {
          myData: 456,
          path: [
            [121.472644, 31.231049],
            [121.482644, 31.231049],
            [121.482644, 31.241049],
            [121.472644, 31.231049]
          ]
        }
      ]
    }
  },

  methods: {
    handleComplete() {
      console.log('map complete', this.$refs.map.getMapInstance())
    },

    findPolygons() {
      console.log(this.$refs.polygon.getAllInstanceByProp('myData', 123))
      // this.$refs.polygon.getInstanceByProps('myData', [123, 789])
    },

    clearAll() {
      this.$refs.polygon.clearAll()
    },

    hidePolygons() {
      this.$refs.polygon.hideAll()
    },

    showPolygons() {
      this.$refs.polygon.showAll()
    },

    addPolygons() {
      const options = [
        {
          myData: 991,
          fillColor: '#fff',
          path: [
            [121.472644, 31.231049],
            [121.482644, 31.231049],
            [121.482644, 31.241049],
            [121.472644, 31.231049]
          ]
        },
        {
          myData: 992,
          fillColor: '#fff',
          path: [
            [121.472644, 31.231049],
            [121.482644, 31.231049],
            [121.482644, 31.241049],
            [121.472644, 31.231049]
          ]
        }
      ]
      this.$refs.polygon.addPolygons(options)
    },

    removePolygons() {
      const instance = this.$refs.polygon
      const polygons = instance.getInstanceByProps('myData', [
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
      instance.removePolygons(polygons, 'myData')
    },

    findPolygon() {
      this.$refs.polygon.getInstanceByProp('myData', 123)
    },

    getAllPolygons() {
      this.$refs.polygon.getAll()
    },

    handlePolygonClick(event) {
      console.log('handlePolygonClick', event.target.dataOptions)
    },

    rerenderPolygon() {
      const list = []
      for (let i = 0; i < 200; i++) {
        let num = 0.01 * i
        list.push({
          myData: i,
          path: [
            [121.472644 + num, 31.231049 + num],
            [121.482644 + num, 31.231049 + num],
            [121.482644 + num, 31.241049 + num],
            [121.472644 + num, 31.231049 + num]
          ]
        })
      }
      this.polygonoOptionsOne = list
    }
  }
}
</script>
