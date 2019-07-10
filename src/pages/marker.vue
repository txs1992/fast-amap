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
        icon="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
        :mid="12"
        :offset="[-13, -30]"
        :options="markerOptions"
        @click="handleMarkerClick"
      ></fast-marker>
      <button style="pointer-events: auto" @click="renderMarker">rerender Marker</button>
      <button style="pointer-events: auto" @click="clearAll">clearAll</button>
      <button style="pointer-events: auto" @click="removeMarkers">remove Markers</button>
      <button style="pointer-events: auto" @click="findMarker">find Marker</button>
      <button style="pointer-events: auto" @click="findMarkers">find Marker list</button>
      <button style="pointer-events: auto" @click="hideMarkers">hide Marker list</button>
      <button style="pointer-events: auto" @click="showMarkers">show Marker list</button>
      <button style="pointer-events: auto" @click="addMarkers">add Marker list</button>
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
          myData: 1,
          position: [121.472644, 31.231049]
        }
      ]
    }
  },

  methods: {
    clearAll() {
      this.$refs.marker.clearAll()
    },

    createOptions() {
      const options = []
      const xList = [121.43, 121.435, 121.44, 121.445, 121.44]
      const yList = [31.229, 31.2295, 31.23, 31.2295, 31.23]
      for (var i = 0; i < 100; i++) {
        let num = 0.001 * (Math.random() * i)
        const x = parseInt(Math.random() * 5)
        options.push({
          myData: i,
          position: [xList[x] + num / 3, yList[x] + num / 6]
        })
      }
      return options
    },

    renderMarker() {
      this.markerOptions = this.createOptions()
    },

    removeMarkers() {
      const list = []
      for (let i = 0; i < 80; i++) {
        list.push(i)
      }
      const markers = this.$refs.marker.getMarkerByProps('myData', list)
      this.$refs.marker.removeMarkers(markers)
      console.log('delete markers for: ', markers)
    },

    findMarker() {
      console.log(
        'findMarker: ',
        this.$refs.marker.getMarkerByProp('myData', 15)
      )
    },

    findMarkers() {
      console.log(
        'findMarker: ',
        this.$refs.marker.getMarkerByProps('myData', [1, 4, 9, 44, 66])
      )
    },

    hideMarkers() {
      this.$refs.marker.hideAll()
    },

    showMarkers() {
      this.$refs.marker.showAll()
    },

    addMarkers() {
      const options = this.createOptions().map(op => ({
        ...op,
        myData: op.myData + 100
      }))
      this.$refs.marker.addMarkers(options)
    },

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
