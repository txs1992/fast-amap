<template>
  <div class="page-polygons">
    <fast-map
      mid="polygons"
      ref="map"
      :zoom="14"
      :double-click-zoom="false"
      @click="handleClick"
      @complete="handleComplete"
    >
      <fast-polygon
        draggable
        mid="polygons"
        :options="polygons"
        :z-index="50"
        @click="handlePolygonClick"
      ></fast-polygon>
      <button style="pointer-events: auto" @click="rerenderPolygon">rerender Polygon</button>
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
          [121.482644, 31.231049],
          [121.482644, 31.241049],
          [121.472644, 31.231049]
        ]
      }
    ];
  }

  public destroyed(): void {
    const mid = "polygons";
    if (registry.getMap(mid)) {
      registry.deleteMap(mid);
    }
  }

  public rerenderPolygon() {
    console.time("test");
    const list = [];
    for (let i = 0; i < 2000; i++) {
      let num = 0.01 * i;
      list.push({
        path: [
          [121.472644 + num, 31.231049 + num],
          [121.482644 + num, 31.231049 + num],
          [121.482644 + num, 31.241049 + num],
          [121.472644 + num, 31.231049 + num]
        ]
      });
    }
    this.polygons = list;
    console.timeEnd("test");
  }

  public handlePolygonClick(event: any) {
    console.log("handlePolygonClick", event);
  }

  public handleClick(): void {
    console.log("handleClick");
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
