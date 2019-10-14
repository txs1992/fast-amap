<template>
  <div class="page-plugin">
    <fast-map
      ref="map"
      mid="plugin"
      :zoom="15"
      :center="[121.462644, 31.231049]"
      :double-click-zoom="false"
    >
      <fast-polygon
        ref="plugin"
        draggable
        mid="plugin"
        :plugins="plugins"
        :options="polygonoOptionsOne"
        :z-index="50"
        :after-create="handleAfterCreate"
        @click="handlePolygonClick"
      ></fast-polygon>
      <button style="pointer-events: auto" @click="editPolygon">编辑</button>
      <button style="pointer-events: auto" @click="closePolygon">关闭</button>
    </fast-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello fast amap',
      polygonoOptionsOne: [
        {
          myData: 123,
          path: [
            [121.442644, 31.231049],
            [121.452644, 31.231049],
            [121.452644, 31.241049],
            [121.442644, 31.231049]
          ]
        }
      ],
      plugins: [
        {
          name: 'AMap.PolyEditor',
          events: {
            addnode: function() {
              console.log('addnode')
            }
          }
        }
      ]
    }
  },

  methods: {
    handleAfterCreate(AMap, map, instances) {
      AMap.plugin(['AMap.PolyEditor'], function() {
        instances.forEach(instance => {
          const edit = new AMap.PolyEditor(map, instance)
          edit.open()
        })
      })
    },

    handlePolygonClick(event) {
      console.log('handlePolygonClick', event.target.dataOptions)
    },

    editPolygon() {
      const polygon = this.$refs.plugin.getAll()[0]
      if (polygon.plugins && polygon.plugins['PolyEditor']) {
        const polyEditor = polygon.plugins['PolyEditor']
        polyEditor.open()
      }
    },

    closePolygon() {
      const polygon = this.$refs.plugin.getAll()[0]
      if (polygon.plugins && polygon.plugins['PolyEditor']) {
        const polyEditor = polygon.plugins['PolyEditor']
        polyEditor.close()
      }
    }
  }
}
</script>
