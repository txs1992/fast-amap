<template>
  <div ref="container" class="cpt-a-map">
    <div class="a-map-slot-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MapRegistry from "../../utils/map-instance-registry";
import { mapLoader } from "../../utils/map-loader";

const registry = MapRegistry.getRegistryInstance();

@Component
export default class AMap extends Vue {
  public name: string;

  constructor(props: any) {
    super(props);
    this.name = "AMap";
  }

  @Prop() private mid!: string | number;

  public getMap() {
    return registry.getMap(this.mid);
  }

  public mounted(): void {
    mapLoader()
      .then(AMap => {
        const map = new AMap.Map(this.$refs.container, {});
        map.on("complete", this.handleComplete);

        registry.setMap(this.mid, map);
      })
      .catch(() => {});
  }

  public beforeDestoryd(): void {
    const map = registry.getMap(this.mid);
    if (map) {
      map.off("complete", this.handleComplete);
    }
  }

  public handleComplete(): void {
    this.$emit("complete");
  }
}
</script>

<style lang="scss">
.cpt-a-map {
  position: relative;
  overflow: hidden;
  height: 400px;

  .a-map-slot-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 999;
    overflow: hidden;
    pointer-events: none;
  }
}
</style>
