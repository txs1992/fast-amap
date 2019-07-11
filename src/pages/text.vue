<template>
  <div class="page-marker">
    <fast-map
      :mid="12"
      ref="map"
      :zoom="15"
      :options="options"
      :center="[121.472644, 31.231049]"
      :double-click-zoom="false"
    >text</fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        height: 800,
        zooms: [3, 16]
      }
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
