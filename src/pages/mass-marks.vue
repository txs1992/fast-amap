<template>
  <div class="page-mass-marks">
    <fast-map
      :mid="12"
      ref="map"
      :zoom="4"
      :options="options"
      :center="[121.472644, 31.231049]"
      :double-click-zoom="false"
    >
      <fast-mass-marks
        :mid="12"
        ref="marks"
        :data="marksDatas"
        :style-option="styleOption"
        @complete="handleComplete"
      ></fast-mass-marks>
    </fast-map>
  </div>
</template>

<script>
// https://a.amap.com/jsapi_demos/static/citys.js
export default {
  data() {
    return {
      options: {
        height: 800,
        zooms: [3, 16]
      },
      styleOption: {
        url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
        anchor: [4, 4],
        size: [7, 7]
      },
      marksDatas: [
        { lnglat: [116.258446, 37.686622], name: '景县', style: 2 },
        { lnglat: [113.559954, 22.124049], name: '圣方济各堂区', style: 2 },
        { lnglat: [116.366794, 39.915309], name: '西城区', style: 2 },
        { lnglat: [116.486409, 39.921489], name: '朝阳区', style: 2 },
        { lnglat: [116.286968, 39.863642], name: '丰台区', style: 2 },
        { lnglat: [116.195445, 39.914601], name: '石景山区', style: 2 },
        { lnglat: [116.310316, 39.956074], name: '海淀区', style: 2 },
        { lnglat: [116.105381, 39.937183], name: '门头沟区', style: 2 },
        { lnglat: [116.139157, 39.735535], name: '房山区', style: 2 },
        { lnglat: [116.658603, 39.902486], name: '通州区', style: 2 },
        { lnglat: [116.653525, 40.128936], name: '顺义区', style: 2 },
        { lnglat: [116.235906, 40.218085], name: '昌平区', style: 2 },
        { lnglat: [116.338033, 39.728908], name: '大兴区', style: 2 },
        { lnglat: [116.637122, 40.324272], name: '怀柔区', style: 2 }
      ]
    }
  },

  methods: {
    handleComplete() {
      console.log('MassMarks 加载完成')
    }
  }
}
</script>
