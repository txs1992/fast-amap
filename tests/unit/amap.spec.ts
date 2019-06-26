import { expect } from "chai";
import { mount, shallowMount } from "@vue/test-utils";
import AMap from "@/components/amap/index.vue";
import MapOptions from "@/utils/map-options";

describe("AMap.vue", () => {
  const mid = "amap-12";
  const mapOptions = MapOptions.getOptionsInstance();

  mapOptions.setOptions({
    key: "d2d76e2274bf5973ecfb1f68454b6f3b",
    version: "1.4.15"
  });

  const wrapper = mount(AMap, {
    propsData: { mid }
  });

  it("renders the correct markup", () => {
    expect(wrapper.html()).contain(
      '<div class="cpt-a-map" style="height: 600px;"><div class="a-map-slot-container"></div></div>'
    );
  });
});
