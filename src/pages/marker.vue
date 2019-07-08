<template>
  <div class="page-marker">
    <fast-map :mid="12" ref="map" :zoom="15" :options="options" :double-click-zoom="false">
      <h1>Marker</h1>
      <fast-marker
        draggable
        icon="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
        :mid="12"
        :offset="[-13, -30]"
        :options="markerOptions"
      ></fast-marker>
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
      markerOptions: [
        {
          position: [121.472644, 31.231049]
        }
      ]
    }
  },

  methods: {
    handleClick() {
      console.log('handleClick', this.$refs.map.getMapInstance())
    },

    handleComplete() {
      this.$refs.map.getAMap().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
