<template>
  <div class="page-polygon">
    <fast-map
      mid="polygons"
      ref="map"
      :zoom="14"
      :double-click-zoom="false"
      @complete="handleComplete"
    >
      <fast-polygon
        draggable
        ref="polygon"
        mid="polygons"
        :options="polygons"
        :z-index="50"
        @click="handlePolygonClick"
      ></fast-polygon>
      <fast-polygon
        ref="polygon2"
        draggable
        mid="polygons"
        :options="polygons"
        :z-index="50"
        @click="handlePolygonClick"
      ></fast-polygon>
      <button style="pointer-events: auto" @click="rerenderPolygon">rerender Polygon</button>
      <button style="pointer-events: auto" @click="clearAll">clearAll</button>
      <button style="pointer-events: auto" @click="removePolygon">remove Polygon</button>
      <button style="pointer-events: auto" @click="findPolygon">find polygon</button>
      <button style="pointer-events: auto" @click="findPolygons">find polygon list</button>
      <button style="pointer-events: auto" @click="hidePolygons">hide polygon list</button>
      <button style="pointer-events: auto" @click="showPolygons">show polygon list</button>
      <button style="pointer-events: auto" @click="addPolygons">add polygon list</button>
    </fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      polygons: [
        {
          myData: 123,
          path: [
            [121.472644, 31.231049],
            [121.482644, 31.231049],
            [121.482644, 31.241049],
            [121.472644, 31.231049]
          ]
        },
        {
          myData: 456,
          path: [
            [121.472644, 31.231049],
            [121.482644, 31.231049],
            [121.482644, 31.241049],
            [121.472644, 31.231049]
          ]
        },
        {
          myData: 789,
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
    handlePolygonClick(event) {
      console.log('handlePolygonClick', event)
    },

    handleComplete() {
      console.log('handleComplete')
    },

    clearAll() {
      this.$refs.polygon.clearAll()
      this.$refs.polygon2.clearAll()
    },

    findPolygon() {
      console.log(
        'findPolygon: ',
        this.$refs.polygon.getPolygonByProp('myData', 123)
      )
    },

    findPolygons() {
      console.log(
        'findPolygons: ',
        this.$refs.polygon.getPolygonByProps('myData', [123, 789])
      )
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

    hidePolygons() {
      this.$refs.polygon.hideAll()
    },

    showPolygons() {
      this.$refs.polygon.showAll()
    },

    removePolygon() {
      const instance = this.$refs.polygon
      const polygons = instance.getAllPolygons()
      instance.removePolygons(polygons)
    },

    rerenderPolygon() {
      console.time('test')
      const list = []
      for (let i = 0; i < 2000; i++) {
        let num = 0.01 * i
        list.push({
          path: [
            [121.472644 + num, 31.231049 + num],
            [121.482644 + num, 31.231049 + num],
            [121.482644 + num, 31.241049 + num],
            [121.472644 + num, 31.231049 + num]
          ]
        })
      }
      this.polygons = list
      console.timeEnd('test')
    }
  }
}
</script>
