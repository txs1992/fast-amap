<template>
  <div class="page-marker">
    <fast-map
      :mid="12"
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
        :icon="iconOptions"
        :mid="12"
        :offset="[-13, -30]"
        :options="markerOptions"
        @click="handleMarkerClick"
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
      iconOptions: {
        size: [25, 34],
        image:
          '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        imageSize: [135, 40],
        imageOffset: [-9, -3]
      },
      markerOptions: [
        {
          myData: 1,
          position: [121.462644, 31.231049]
        },
        {
          myData: 2,
          position: [121.472644, 31.231049]
        }
      ]
    }
  },

  methods: {
    handleClick() {
      console.log('handleClick', this.$refs.map.getMapInstance())
    },

    handleMarkerClick(event) {
      console.log('handleMarkerClick')
    },

    handleComplete() {
      this.$refs.map.getAMap().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

