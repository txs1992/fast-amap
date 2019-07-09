import { warn } from './utils'
import MapOptions from './map-options'

let AMap = null
const defaultPath = 'https://webapi.amap.com/maps'
const mapOptions = MapOptions.getOptionsInstance()

/**
 * 地图加载器
 * @param key
 * @param version
 * @param url
 */
export default function mapLoader(key, version, url) {
  return new Promise((reslove, reject) => {
    if (AMap) {
      return reslove(AMap)
    }

    if (!url && (!key || !version)) {
      warn(
        'The parameter is incorrect and must contain the url attribute or the key and version attributes.'
      )
    }

    const aMapUrl = url ? url : `${defaultPath}?v=${version}&key=${key}`

    const jsApi = document.createElement('script')
    jsApi.charset = 'utf-8'
    jsApi.src = aMapUrl
    jsApi.onerror = reject
    jsApi.onload = () => {
      if (window.AMap) {
        AMap = window.AMap
        // 如果不加上 setTimeout 在本地开发时，会有一定几率导致刷新页面覆盖物无法显示在地图上。
        setTimeout(() => {
          reslove(AMap)
        }, 0)
      } else {
        warn('AMap SDK Load Failure.')
      }
    }

    document.head.appendChild(jsApi)
  })
}

export function mapOptionLoader() {
  const option = mapOptions.getOptions() || {}
  return mapLoader(option.key, option.version, option.url)
}
