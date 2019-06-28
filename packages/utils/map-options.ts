export default class AMapOptions {
  private options: AMapOptionsParamInterface | null;
  private static optionsInstance: AMapOptions;

  private constructor() {
    this.options = null;
  }

  public getOptions(): AMapOptionsParamInterface | null {
    return this.options;
  }

  public setOptions(options: AMapOptionsParamInterface): void {
    this.options = options;
  }

  public static getOptionsInstance() {
    if (!AMapOptions.optionsInstance) {
      AMapOptions.optionsInstance = new AMapOptions();
    }

    return AMapOptions.optionsInstance;
  }
}
