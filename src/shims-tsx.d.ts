import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

  interface Window {
    AMap: any;
  }

  interface AMapOptionsParamInterface {
    key?: string;
    url?: string;
    version?: string;
  }

  interface Object {
    off: any;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    // $el: Element;
  }
}
