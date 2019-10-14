import { mapOptionLoader } from '../utils/map-loader'
import MapRegistry from '../utils/map-instance-registry'
import { warn } from '../utils/utils'

const registry = MapRegistry.getRegistryInstance()

let AMapInstance = null

export default {
  props: {
    mid: {
      type: [String, Number],
      required: true
    },

    options: {
      type: Array,
      default() {
        return []
      }
    },

    beforeCreate: Function,

    plugins: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      rendered: false
    }
  },

  created() {
    mapOptionLoader().then(AMap => {
      AMapInstance = AMap
    })

    // 由于需要将高德地图与 vue 解耦，所以这里创建的实例数组不能被 vue watch。
    if (!this.instanceList) {
      this.instanceList = []
    }
  },

  beforeDestroy() {
    if (typeof this.clearAll === 'function') this.clearAll()
  },

  watch: {
    plugins: {
      handler() {
        this.$nextTick(() => {
          if (this.rendered) this.addPlugins()
        })
      }
    }
  },

  methods: {
    getAMapPromise() {
      return mapOptionLoader()
    },

    getAMapInstance() {
      return AMapInstance
    },

    getMapInstance(mid) {
      return registry.getMap(mid || this.mid)
    },

    showAll() {
      this.instanceList.forEach(instance => instance.show())
    },

    hideAll() {
      this.instanceList.forEach(instance => instance.hide())
    },

    getAll() {
      return this.instanceList.slice(0)
    },

    /**
     * 根据属性名称和值找到一个实例
     * @param {String} propName
     * @param {String|Number} propValue
     */
    getInstanceByProp(propName, propValue) {
      return this.instanceList.find(
        it => it.dataOptions[propName] === propValue
      )
    },

    /**
     * 根据属性名称和一组值找到一组实例
     * @param {String} propName
     * @param {Array} propValues
     */
    getInstanceByProps(propName, propValues) {
      if (!Array.isArray(propValues)) {
        warn('propValues is an array.')
        return
      }

      const searchMap = {}
      this.instanceList.forEach(instance => {
        const data = instance.dataOptions
        searchMap[data[propName]] = instance
      })

      const searchList = []
      propValues.forEach(v => {
        if (searchMap[v]) searchList.push(searchMap[v])
      })
      return searchList
    },

    /**
     * 通用清除覆盖物函数，在清理覆盖物之前会调用 beforeClear 钩子函数，
     * 并将需要清除的覆盖物实例数组传入，可以在清除前做些自定义操作。
     * @param {String} name 覆盖物实例的名称
     * @param {Array} events 覆盖物注册的事件列表
     * @param {Function} beforeClear 钩子函数
     */
    $_amapMixin_clearAll(name, events, beforeClear) {
      const { mid, instanceList: instances } = this
      const map = this.getMapInstance(mid)
      // 调用通用删除事件方法，删除实例注册的事件。
      this.$_amapMixin_removeEvents(instances, events, name)
      if (typeof beforeClear === 'function') beforeClear(instances)
      map.remove(instances)
      this.instanceList = []
    },

    /**
     * 删除覆盖物数组的公共方法，会在删除前调用钩子函数，并传入实例数组。
     * @param {String} name 实例名称
     * @param {Array} events  实例注册的事件数组
     * @param {Array} instances 要删除的实例数组
     * @param {String} propName 删除数组的 key，如果传入将启动优化
     * @param {Function} beforeRemove 钩子函数
     */
    $_amapMixin_removeInstances(
      name,
      events,
      instances,
      propName,
      beforeRemove
    ) {
      if (!Array.isArray(instances)) {
        warn(`${name} is not an Array.`)
        return
      }
      const { mid, instanceList: list } = this
      const map = this.getMapInstance(mid)

      // 调用通用删除事件方法，删除实例注册的事件。
      this.$_amapMixin_removeEvents(instances, events, name)

      if (typeof beforeRemove === 'function') beforeRemove(instances)

      // 从地图中删除覆盖物
      map.remove(instances)

      // 从组件的实例数组中删除对应的覆盖物实例
      // 如果添加了 propName 属性将采用优化查找
      if (propName) {
        const searchMap = {}

        list.forEach((item, index) => {
          searchMap[item.dataOptions[propName]] = index
        })

        instances.forEach((instance, len) => {
          const index = searchMap[instance.dataOptions[propName]]
          if (index > -1) {
            list.splice(index - len, 1)
          }
        })
      } else {
        instances.forEach(instance => {
          const index = list.indexOf(instance)
          if (index > -1) {
            list.splice(index, 1)
          }
        })
      }
    },

    /**
     * 通用创建地图 Offset 方法
     * @param {Array} offset
     * @param {String} name
     */
    $_amapMixin_createOffset(offset, name = 'offset') {
      if (!Array.isArray(offset)) {
        warn(`${name} is not an Array.`)
        return
      }
      const AMap = this.getAMapInstance()

      const [x, y] = offset
      let offsetPixel = null
      try {
        offsetPixel = new AMap.Pixel(x, y)
      } catch (e) {
        warn(`${name} creation failed.`, e)
      }
      return offsetPixel
    },

    $_amapMixin_setMapInstance(mid, instance) {
      registry.setMap(mid, instance)
    },

    $_amapMixin_deleteMapInstance(mid) {
      registry.deleteMap(mid)
    },

    $_amapMixin_handleEvents(event) {
      this.$emit(event.type, event, this.getMapInstance(this.mid))
    },

    /**
     * 通用注册事件方法
     * @param {Object} instance 实例对象
     * @param {Array} events 事件数组
     */
    $_amapMixin_addEvents(instance, events) {
      events.forEach(event => {
        // 注册事件，并传入通用函数处理方法
        instance.on(event, this.$_amapMixin_handleEvents)
      })
    },

    /**
     * 通用删除事件方法
     * @param {Array} instanceList 实例数组
     * @param {Array} events  事件数组
     * @param {String} name 实例名称
     */
    $_amapMixin_removeEvents(instanceList, events, name) {
      if (Array.isArray(instanceList)) {
        instanceList.forEach(instance => {
          events.forEach(event => {
            instance.off(event, this.$_amapMixin_handleEvents)
          })
        })
      } else {
        warn(`${name} is not an array.`)
      }
    },

    /**
     * 通用获取实例配置方法
     * @param {Object} beforeOption 配置生成结束前调用的钩子，传入当前配置对象
     */
    $_amapMixin_getInstanceOptions(beforeOption) {
      const { path, options, beforeCreate } = this
      const propsOptions = this.getPropsOptions()

      const instanceOptions = []

      options.forEach((option, index) => {
        const mergeOption = {
          ...propsOptions,
          path: path ? path[index] : [],
          ...option
        }

        if (beforeOption) beforeOption(mergeOption)

        const instanceOption = beforeCreate
          ? beforeCreate(mergeOption, index)
          : mergeOption

        instanceOptions.push(instanceOption)
      })

      return instanceOptions
    },

    /**
     * 通用处理 options 数据观察方法
     */
    $_amapMixin_handleOptionsChange() {
      this.rendered = false
      this.getAMapPromise().then(() => {
        this.clearAll()

        const map = this.getMapInstance(this.mid)
        const options = this.getInstanceOptions()
        options.forEach(option => {
          // 调用组件的创建实例方法
          const instance = this.createInstance(option)
          this.instanceList.push(instance)
        })
        this.rendered = true
        this.$nextTick(() => {
          this.addPlugins()
        })
        map.add(this.instanceList)
      })
    },

    addPlugins(list) {
      // 加载插件
      const AMap = this.getAMapInstance()
      const plugins = this.plugins
      const map = this.getMapInstance(this.mid)
      const pluginNames = plugins.map(plugin => plugin.name)
      const instanceList = list || this.instanceList

      if (plugins.length) {
        AMap.plugin(pluginNames, () => {
          pluginNames.forEach((pName, pIdx) => {
            const shortName = pName.replace('AMap.', '')
            const pOption = this.plugins[pIdx]

            if (shortName === 'MarkerClusterer') {
              this.clusterer = new AMap.MarkerClusterer(
                map,
                instanceList,
                pOption.options
              )
            } else {
              instanceList.forEach(instance => {
                if (AMap[shortName]) {
                  // 创建插件实例
                  const plugin = new AMap[shortName](
                    map,
                    instance,
                    pOption.options
                  )

                  const events = pOption.events
                  if (events) {
                    for (let key in events) {
                      const fn = events[key]
                      plugin.on(key, fn)
                    }
                  }

                  // 将插件放入实例属性中
                  instance.plugin = plugin
                }
              })
            }
          })
        })
      }
    },

    /**
     * 通用添加一组实例的方法
     * @param {Array} options 实例配置数组
     * @param {Function} beforeCreate 创建实例前调用的钩子函数
     * @param {Object} beforeOption 配置生成前调用的钩子函数
     */
    $_amapMixin_addInstances(options, beforeCreate, beforeOption) {
      if (!Array.isArray(options)) {
        warn('options is not an Array.')
        return
      }
      const propsOption = this.getPropsOptions()
      const map = this.getMapInstance(this.mid)
      const newList = []

      options.forEach((option, index) => {
        const mergeOption = {
          ...propsOption,
          ...option
        }

        if (beforeOption) beforeOption(mergeOption)

        const instanceOption = beforeCreate
          ? beforeCreate(mergeOption, index)
          : mergeOption

        const instance = this.createInstance(instanceOption)
        newList.push(instance)
      })
      map.add(newList)
      this.addPlugins(newList)
      // this.rendered
      this.instanceList = this.instanceList.concat(newList)
    }
  },

  render() {
    return null
  }
}
