<template>
  <div class="page-polygons">
    <fast-map
      mid="polygons"
      ref="map"
      :options="options"
      @complete="handleComplete"
      @click="handleClick"
    >
      <fast-polygons mid="polygons" :polygons="polygons" :z-index="50" draggable></fast-polygons>
    </fast-map>
  </div>
</template>

<script lang="ts">
import { registry } from "packages/index";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PageAMap extends Vue {
  public options: any;
  public polygons: Array<any>;

  constructor() {
    super();
    this.options = { name: "mt", doubleClickZoom: false };
    this.polygons = [
      {
        path: [
          [121.472644, 31.231049],
          [121.582644, 31.231049],
          [121.582644, 31.341049],
          [121.472644, 31.231049]
        ]
      }
    ];
  }

  public beforeDestroy(): void {
    const mid = "polygons";
    if (registry.getMap(mid)) {
      registry.deleteMap(mid);
    }
  }

  public handleClick(): void {
    const map = (this.$refs.map as any).getMapInstance();
    console.log("handleClick", map.getBounds().getCenter());
  }

  public handleComplete(): void {
    console.log("handleComplete");
  }
}
</script>

<style lang="scss">
.page-polygons {
  height: 100%;
  min-height: 400px;
  background: #ccc;
}
</style>
