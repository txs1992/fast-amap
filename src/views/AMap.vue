<template>
  <div class="page-amap">
    <fast-map mid="12" ref="map" :options="options" @complete="handleComplete" @click="handleClick">
      <h1>amap</h1>
    </fast-map>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FastMap from "packages/components/map";
import MapOptions from "packages/utils/map-options";

const mapOptions = MapOptions.getOptionsInstance();
mapOptions.setOptions({
  key: "d2d76e2274bf5973ecfb1f68454b6f3b",
  version: "1.4.15"
});

@Component({
  components: {
    FastMap
  }
})
export default class PageAMap extends Vue {
  data() {
    return {
      options: { name: "mt", doubleClickZoom: false }
    };
  }

  public mounted() {}

  public handleClick() {
    console.log("handleClick", (this.$refs.map as any).getMapInstance());
  }

  public handleComplete() {
    console.log("handleComplete");
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
