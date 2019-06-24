declare global {
  interface Window {
    AMap: any;
  }
}

export const defaultPath = "https://webapi.amap.com/maps";

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
    if (!url || (!key && !version)) {
      reject(
        new Error(
          "The parameter is incorrect and must contain the url attribute or the key and version attributes."
        )
      );
    }

    const aMapUrl = url ? url : `${defaultPath}?v=${version}&key=${key}`;

    const jsApi = document.createElement("script");
    jsApi.charset = "utf-8";
    jsApi.src = aMapUrl;
    jsApi.onerror = reject;
    jsApi.onload = () => {
      if (window.AMap) {
        reslove(window.AMap);
      } else {
        reject(new Error("Map SDK Load Failure."));
      }
    };

    document.head.appendChild(jsApi);
  });
}
