<template>
  <div class="page-polygon">
    <fast-map
      ref="map"
      mid="polyline"
      :zoom="15"
      :center="[121.472644, 31.231049]"
      :double-click-zoom="false"
      @complete="handleComplete"
    ></fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello fast amap'
    }
  },

  methods: {
    handleComplete() {
      console.log('map complete', this.$refs.map.getMapInstance())
    }
  }
}
</script>
