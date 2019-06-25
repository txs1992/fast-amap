import warn from "@/utils/error";
import MapOptions from "./map-options";

const mapOptions = MapOptions.getOptionsInstance();

export const defaultPath = "https://webapi.amap.com/maps";
export let AMap: any;

/**
 * 地图加载器
 * @param key
 * @param version
 * @param url
 */
export default function loader(
  key?: string,
  version?: string,
  url?: string
): Promise<any> {
  return new Promise((reslove, reject) => {
    if (AMap) {
      return reslove(AMap);
    }

    if (!url && (!key || !version)) {
      warn(
        "The parameter is incorrect and must contain the url attribute or the key and version attributes."
      );
    }

    const aMapUrl = url ? url : `${defaultPath}?v=${version}&key=${key}`;

    const jsApi = document.createElement("script");
    jsApi.charset = "utf-8";
    jsApi.src = aMapUrl;
    jsApi.onerror = reject;
    jsApi.onload = () => {
      if (window.AMap) {
        AMap = window.AMap;
        reslove(AMap);
      } else {
        warn("AMap SDK Load Failure.");
      }
    };

    document.head.appendChild(jsApi);
  });
}

export function mapLoader(): Promise<any> {
  const option: AMapOptionsParamInterface | any = mapOptions.getOptions() || {};
  return loader(option.key, option.version, option.url);
}
