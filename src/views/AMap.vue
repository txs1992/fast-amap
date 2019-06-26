<template>
  <div class="page-amap">
    <a-map
      mid="12"
      ref="amap"
      :options="options"
      @complete="handleComplete"
      @click="handleClick"
    >
      <h1>amap</h1>
    </a-map>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AMap from "../components/amap";
import MapOptions from "../utils/map-options";

const mapOptions = MapOptions.getOptionsInstance();
mapOptions.setOptions({
  key: "d2d76e2274bf5973ecfb1f68454b6f3b",
  version: "1.4.15"
});

@Component({
  components: {
    AMap
  }
})
export default class PageAMap extends Vue {
  data() {
    return {
      options: { name: "mt" }
    };
  }

  public mounted() {
    // console.log('PageAMap mounted')
    // console.log(this.$refs.amap.getMap());
  }

  public handleClick() {
    console.log("handleClick");
  }

  public handleComplete() {
    console.log("handleComplete");
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
