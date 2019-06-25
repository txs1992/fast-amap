<template>
  <div ref="container" class="cpt-a-map" :style="{ height: height + 'px' }">
    <div class="a-map-slot-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapLoader } from "@/utils/map-loader";
import MapRegistry from "@/utils/map-instance-registry";
import events from "./event";
import event from "./event";

const registry = MapRegistry.getRegistryInstance();

@Component
export default class AMap extends Vue {
  public name: string;

  constructor(props: any) {
    super(props);
    this.name = "AMap";
  }

  @Prop() private mid!: string | number;

  @Prop({ default: 600 }) private height!: number | string;

  @Prop({
    default() {
      return {};
    }
  })
  private options!: any;

  public getMap() {
    return registry.getMap(this.mid);
  }

  public mounted(): void {
    mapLoader()
      .then(AMap => {
        const map = new AMap.Map(this.$refs.container, this.options);

        if (map) {
          events.forEach(evnetName => {
            map.on(evnetName, this.handleComplete);
          });
        }

        registry.setMap(this.mid, map);
      })
      .catch(() => {});
  }

  public beforeDestoryd(): void {
    const map = registry.getMap(this.mid);
    if (map) {
      events.forEach(evnetName => {
        map.off(evnetName, this.handleComplete);
      });
    }
  }

  public handleComplete(event: any): void {
    this.$emit(event.type, event);
  }
}
</script>

<style lang="scss">
.cpt-a-map {
  position: relative;
  overflow: hidden;

  .a-map-slot-container {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 999;
    overflow: hidden;
    pointer-events: none;
  }
}
</style>
