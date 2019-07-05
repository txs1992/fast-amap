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
        mid="polygons"
        :options="polygons"
        :z-index="50"
        @click="handlePolygonClick"
      ></fast-polygon>
      <fast-polygon
        draggable
        mid="polygons"
        :options="polygons"
        :z-index="50"
        @click="handlePolygonClick"
      ></fast-polygon>
      <button style="pointer-events: auto" @click="rerenderPolygon">
        rerender Polygon
      </button>
    </fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      polygons: [
        {
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

  destroyed() {
    const mid = 'polygons'
    if (this.$refs.map.registry.getMap(mid)) {
      this.$refs.map.registry.deleteMap(mid)
    }
  },

  methods: {
    handlePolygonClick(event) {
      console.log('handlePolygonClick', event)
    },

    handleComplete() {
      console.log('handleComplete')
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
