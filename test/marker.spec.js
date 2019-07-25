import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'

const { mapOptions, FastMap, FastMarker } = FastAMap

describe('FastMarker', () => {
  mapOptions.setOptions({
    key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
    version: '1.4.15'
  })

  const mapWrapper = mount(FastMap, {
    propsData: {
      mid: 'marker'
    }
  })

  const wrapper = mount(FastMarker, {
    propsData: {
      mid: 'marker',
      options: [
        {
          myData: 1,
          position: [121.472644, 31.231049]
        }
      ],
      draggable: true,
      clickable: true,
      offset: [-13, -30],
      icon:
        '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
    }
  })

  it('test getMarkerByProp function', done => {
    wrapper.vm
      .getAMapPromise()
      .then(() => {
        const marker = wrapper.vm.getMarkerByProp('myData', 1)
        expect(marker).to.be.an('object')
        expect(marker.CLASS_NAME).to.be.a('string')
        expect(marker.CLASS_NAME).to.equal('AMap.Marker')
        done()
      })
      .catch(() => done(new Error()))
  })
})
