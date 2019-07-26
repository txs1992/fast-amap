import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'

const { mapOptions, FastMap, FastMarker } = FastAMap

function createMarker() {
  return mount(FastMarker, {
    propsData: {
      mid: 'marker',
      options: [
        {
          myData: 1,
          position: [121.472644, 31.231049]
        },
        {
          myData: 2,
          position: [121.482644, 31.231049]
        }
      ],
      draggable: true,
      clickable: true,
      offset: [-13, -30],
      icon:
        '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
    }
  })
}

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

  it('test getMarkerByProp function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createMarker()
        setTimeout(() => {
          const marker = wrapper.vm.getMarkerByProp('myData', 1)
          expect(marker).to.be.an('object')
          expect(marker.CLASS_NAME).to.be.a('string')
          expect(marker.CLASS_NAME).to.equal('AMap.Marker')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getMarkerByProps function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createMarker()
        setTimeout(() => {
          const markers = wrapper.vm.getMarkerByProps('myData', [1, 2])
          expect(markers.length).to.be.equal(2)
          expect(markers).to.be.an('array')
          expect(markers[0].CLASS_NAME).to.be.a('string')
          expect(markers[1].CLASS_NAME).to.equal('AMap.Marker')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })
})
