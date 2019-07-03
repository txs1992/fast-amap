<template>
  <div class="page-map">
    <fast-map
      :mid="12"
      ref="map"
      :options="options"
      @complete="handleComplete"
      @click="handleClick"
    >
      <h1>amap</h1>
    </fast-map>
  </div>
</template>

<script lang="ts">
import { registry } from "packages/index";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PageAMap extends Vue {
  public options: any;

  constructor() {
    super();
    this.options = { name: "mt", doubleClickZoom: false };
  }

  public destroyed(): void {
    const mid = 12;
    if (registry.getMap(mid)) {
      registry.deleteMap(mid);
    }
  }

  public handleClick(): void {
    console.log("handleClick", (this.$refs.map as any).getMapInstance());
  }

  public handleComplete(): void {
    (this.$refs.map as any).getAMap().then((res: any) => {
      console.log(res);
    });
  }
}
</script>

<style lang="scss">
.page-amap {
  height: 100%;
  min-height: 400px;
  background: #ccc;
}
</style>
