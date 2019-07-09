<template>
  <div class="page-map">
    <fast-map
      :mid="12"
      ref="map"
      :zoom="15"
      :options="options"
      :double-click-zoom="false"
      @click="handleClick"
      @complete="handleComplete"
      @dragstart="handleMovestart"
      @resize="handleMapmove"
    >
      <h1>amap</h1>
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
      }
    }
  },

  methods: {
    handleClick() {
      console.log('handleClick', this.$refs.map.getMapInstance())
    },

    handleComplete() {
      this.$refs.map.getAMapPromise().then(res => {
        console.log(res)
      })
    },

    handleMovestart() {
      console.log('dragstart')
    },

    handleMapmove() {
      console.log('resize')
    }
  }
}
</script>
