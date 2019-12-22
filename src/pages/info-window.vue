<template>
  <div class="page-circle">
    <fast-map
      ref="map"
      mid="infoWindow"
      :zoom="15"
      :center="[121.472644, 31.231049]"
      :double-click-zoom="false"
      @complete="handleComplete"
      @click="handleClick"
    >
      <h1>{{msg}}</h1>
      <button style="pointer-events: auto" @click="oepn">oepn</button>
      <button style="pointer-events: auto" @click="close">close</button>
      <fast-info-window
        is-cstom
        ref="infoWindow"
        mid="infoWindow"
        :offset="[-13, -30]"
        :position="[121.472644, 31.231049]"
        :default-open="false"
        @open="handleOpen"
        @close="handleClose"
      >
        <div>这里是 content 区域</div>
      </fast-info-window>
    </fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '点击屏幕移动信息窗体'
    }
  },

  methods: {
    handleClick(e) {
      const ref = this.$refs.infoWindow
      if (ref) {
        const infoWindow = ref.getInfoWindowInstance()
        if (infoWindow) {
          const lnglat = e.lnglat
          infoWindow.setPosition(lnglat)
        }
      }
    },

    oepn() {
      this.$refs.infoWindow.open()
    },

    close() {
      this.$refs.infoWindow.close()
    },

    handleComplete() {
      console.log('map complete', this.$refs.map.getMapInstance())
    },

    handleOpen() {
      console.log('open')
    },

    handleClose() {
      console.log('close')
    }
  }
}
</script>
