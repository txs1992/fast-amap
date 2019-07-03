import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AMapPropMixin extends Vue {
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  path!: Array<any>;

  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  strokeDasharray!: Array<any>;

  @Prop({ type: Boolean, default: false }) bubble!: boolean;
  @Prop({ type: Number, default: 10 }) zIndex!: number;
  @Prop({ type: String, default: "#006600" }) strokeColor!: string;
  @Prop({ type: Number, default: 0.9 }) strokeOpacity!: number;
  @Prop(Number) strokeWeight!: number;
  @Prop({ type: Boolean, default: false }) draggable!: boolean;
  @Prop() extData: any;
  @Prop({ type: String, default: "solid" }) strokeStyle!: string;
}
