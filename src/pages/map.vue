<template>
  <div class="page-map">
    <fast-map
      :mid="12"
      ref="map"
      :zoom="15"
      :options="options"
      :center="center"
      :double-click-zoom="false"
      @click="handleClick"
      @complete="handleComplete"
      @dragstart="handleMovestart"
      @resize="handleMapmove"
    >
      <h1>amap</h1>
      <button style="pointer-events: auto" @click="changeCenter">change center</button>
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
      center: [121.472644, 31.231049]
    }
  },

  methods: {
    handleClick() {
      console.log('handleClick', this.$refs.map.getMapInstance())
    },

    changeCenter() {
      this.center = [120, 30]
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
