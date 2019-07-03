import { expect } from "chai";
import { mount, shallowMount } from "@vue/test-utils";
import FastMap from "packages/components/map/map.vue";
import MapOptions from "packages/utils/map-options";

describe("AMap.vue", () => {
  const mid = "amap-12";
  const mapOptions = MapOptions.getOptionsInstance();

  mapOptions.setOptions({
    key: "d2d76e2274bf5973ecfb1f68454b6f3b",
    version: "1.4.15"
  });

  const wrapper = mount(FastMap, {
    propsData: { mid }
  });

  it("renders the correct markup", () => {
    expect(wrapper.html()).contain(
      '<div class="cpt-fast-map" style="height: 600px;"><div class="fast-map-slot-container"><!----></div></div>'
    );
  });
});
