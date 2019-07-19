<template>
  <div class="page-polygon">
    <fast-map
      ref="map"
      mid="polyline"
      :zoom="4"
      :zooms="[3,18]"
      :center="[121.472644, 31.231049]"
      @complete="handleComplete"
    >
      <fast-polyline
        geodesic
        mid="polyline"
        stroke-style="solid"
        stroke-color="#3366FF"
        :options="polylineOptions"
        :strokeWeight="6"
        :stroke-pacity="1"
        :double-click-zoom="false"
        :stroke-dasharray="[10, 5]"
      ></fast-polyline>
    </fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello fast amap',
      polylineOptions: [
        {
          path: [['75.757904', '38.118117'], ['117.375719', '24.598057']]
        },
        {
          path: [['85.757904', '35.118117'], ['127.375719', '34.598057']]
        }
      ]
    }
  },

  methods: {
    handleComplete() {
      console.log('map complete', this.$refs.map.getMapInstance())
    }
  }
}
</script>
