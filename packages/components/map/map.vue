<template>
  <div ref="container" class="cpt-fast-map" :style="{ height: height + 'px' }">
    <div class="fast-map-slot-container">
      <slot v-if="mapLoaded"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";

import AMapMixin from "packages/mixins/a-map";
import { noop } from "packages/utils/utils";

import events from "./events";

@Component
export default class FastMap extends Mixins(AMapMixin) {
  public name: string;
  private mapLoaded: boolean;

  constructor(props: any) {
    super(props);
    this.name = "FastMap";
    this.mapLoaded = false;
  }

  @Prop({ default: 600 }) private height!: number | string;

  @Prop({
    default() {
      return {};
    }
  })
  private options!: any;

  public mounted(): void {
    this.getAMap()
      .then(AMap => {
        const map = new AMap.Map(this.$refs.container, this.options);

        if (map) {
          this.setMapInstance(this.mid, map);

          events.forEach(evnetName => {
            map.on(evnetName, this.handleEvents);
          });
        }
      })
      .catch(noop);
  }

  public beforeDestoryd(): void {
    const map = this.getMapInstance(this.mid);
    if (map) {
      events.forEach(evnetName => {
        map.off(evnetName, this.handleEvents);
      });
    }
  }

  public handleEvents(event: any): void {
    if (event.type === "complete") {
      this.mapLoaded = true;
    }
    this.$emit(event.type, event, this.getMapInstance(this.mid));
  }
}
</script>

<style lang="scss">
.cpt-fast-map {
  position: relative;
  overflow: hidden;

  .fast-map-slot-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 999;
    overflow: hidden;
    pointer-events: none;
  }
}
</style>
