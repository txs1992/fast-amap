<template>
  <div class="page-bezier-curve">
    <fast-map
      mid="bezier-curve"
      ref="bezierCurve"
      :zoom="15"
      :center="[116.400857,39.899498]"
      :options="options"
      :double-click-zoom="false"
      @click="handleClick"
    >
      <fast-bezier-curve
        is-outline
        mid="bezier-curve"
        line-cap="round"
        line-join="round"
        stroke-style="solid"
        stroke-color="#3366FF"
        outline-color="#ffeeff"
        :options="bezierCurveOptions"
        :z-index="50"
        :border-weight="3"
        :stroke-opacity="1"
        :stroke-weight="6"
        :stroke-dasharray="[10, 10]"
      ></fast-bezier-curve>
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
      bezierCurveOptions: [
        {
          path: [
            //每个弧线段有两种描述方式
            [116.39, 39.91, 116.37, 39.91], //起点
            //第一段弧线
            [116.380298, 39.907771, 116.38, 39.9], //控制点，途经点
            //第二段弧线
            [116.385298, 39.907771, 116.4, 39.9], //控制点，途经点//弧线段有两种描述方式1
            //第三段弧线
            [
              //弧线段有两种描述方式2
              [116.392872, 39.887391], //控制点
              [116.40772, 39.909252], //控制点
              [116.41, 39.89] //途经点
            ],
            //第四段弧线
            [
              116.423857,
              39.889498,
              116.422312,
              39.899639,
              116.425273,
              39.902273
            ]
            //控制点，控制点，途经点，每段最多两个控制点
          ]
        }
      ]
    }
  },

  methods: {
    handleClick() {
      console.log('handleClick', this.$refs.bezierCurve.getMapInstance())
    }
  }
}
</script>
