export default class AMapOptions {
  constructor() {
    this.options = null
  }

  getOptions() {
    return this.options
  }

  setOptions(options) {
    this.options = options
  }

  static getOptionsInstance() {
    if (!this.options) {
      this.options = new AMapOptions()
    }

    return this.options
  }
}
