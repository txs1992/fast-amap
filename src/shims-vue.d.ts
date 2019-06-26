declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module Vue {
  interface VueConstructor {
    name: any;
    install: any;
    components: any;
  }
}
