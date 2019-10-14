<template>
  <div class="page-marker-clusterer">
    <fast-map
      :mid="212"
      ref="map"
      :zoom="15"
      :options="options"
      :center="[121.472644, 31.231049]"
      :double-click-zoom="false"
    >
      <fast-marker
        draggable
        clickable
        ref="marker"
        icon="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
        :mid="212"
        :plugins="plugins"
        :offset="[-13, -30]"
        :options="markerOptions"
        @click="handleMarkerClick"
      ></fast-marker>
    </fast-map>
  </div>
</template>

<script>
function createOptions() {
  const options = []
  const xList = [121.43, 121.435, 121.44, 121.445, 121.44]
  const yList = [31.229, 31.2295, 31.23, 31.2295, 31.23]
  for (var i = 0; i < 50; i++) {
    let num = 0.001 * (Math.random() * i)
    const x = parseInt(Math.random() * 5)
    options.push({
      myData: i,
      position: [xList[x] + num / 3, yList[x] + num / 6]
    })
  }
  return options
}

export default {
  data() {
    return {
      visible: false,
      options: {
        height: 800,
        zooms: [3, 16]
      },
      markerOptions: createOptions(),
      plugins: [
        {
          name: 'AMap.MarkerClusterer',
          options: {
            gridSize: 80
          }
        }
      ]
    }
  },

  mounted() {
    this.$refs.map.getAMapPromise().then(AMap => {
      this.visible = true
    })
  },

  methods: {
    clearAll() {
      this.$refs.marker.clearAll()
    },

    renderMarker() {
      this.markerOptions = this.createOptions()
    },

    handleMarkerClick(event) {
      console.log('handleMarkerClick')
    }
  }
}
</script>
