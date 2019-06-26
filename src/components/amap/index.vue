<template>
  <div ref="container" class="cpt-a-map" :style="{ height: height + 'px' }">
    <div :class="reload" class="a-map-slot-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";

import { mapLoader } from "@/utils/map-loader";
import AMapMixin from "@/mixins/a-map";
import { noop } from "@/utils/utils";

import events from "./event";

@Component
export default class AMap extends Mixins(AMapMixin) {
  public name: string;
  private reload: boolean;
  private unwatchPlugins: any;

  constructor(props: any) {
    super(props);
    this.name = "AMap";
    this.reload = true;
  }

  @Prop() private mid!: string | number;

  @Prop({ default: 600 }) private height!: number | string;

  @Prop({
    default() {
      return {};
    }
  })
  private options!: any;

  public mounted(): void {
    mapLoader()
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
      if (this.unwatchPlugins) this.unwatchPlugins();
    }
  }

  public handleEvents(event: any): void {
    this.$emit(event.type, event, this.getMapInstance(this.mid));
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
