import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import AMap from "@/components/AMap.vue";

describe("AMap.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(AMap, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});
