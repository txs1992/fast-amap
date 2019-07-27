import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'

const { mapOptions, FastMap, FastMarker } = FastAMap

function createMarker(callback) {
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
    },
    listeners: {
      click: callback ? callback : () => {}
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

  it('test marker click events', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createMarker((event, map) => {
          expect(event).to.be.an('object')
          expect(map.CLASS_NAME).to.equal('AMap.Map')
          expect(map).to.eql(mapWrapper.vm.getMapInstance())
          done()
        })
        setTimeout(() => {
          const marker = wrapper.vm.getMarkerByProp('myData', 1)
          if (marker.bf.click[0].tb) {
            // 模拟 marker 覆盖物点击事件
            marker.bf.click[0].tb({ type: 'click' })
          }
        }, 0)
      })
      .catch(() => done(new Error()))
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

  it('test marker getAllMarkers function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createMarker()
        setTimeout(() => {
          const markers = wrapper.vm.getAllMarkers()
          expect(markers).to.be.an('array')
          expect(markers.length).to.be.equal(2)
          expect(markers[0].CLASS_NAME).to.equal('AMap.Marker')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test marker addMarkers function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createMarker()
        setTimeout(() => {
          const markers = wrapper.vm.getAllMarkers()
          expect(markers.length).to.be.equal(2)

          const options = [
            {
              myData: 3,
              position: [121.472644, 31.231049]
            },
            {
              myData: 4,
              position: [121.482644, 31.231049]
            }
          ]

          wrapper.vm.addMarkers(options)
          expect(wrapper.vm.getAllMarkers().length).to.be.equal(4)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test marker removeMarkers function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createMarker()
        setTimeout(() => {
          const markers = wrapper.vm.getAllMarkers()
          expect(markers).to.be.an('array')
          expect(markers.length).to.be.equal(2)
          wrapper.vm.removeMarkers(markers, 'myData')
          expect(wrapper.vm.getAllMarkers().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test marker clearAll function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createMarker()
        setTimeout(() => {
          const markers = wrapper.vm.getAllMarkers()
          expect(markers).to.be.an('array')
          expect(markers.length).to.be.equal(2)
          wrapper.vm.clearAll()
          expect(wrapper.vm.getAllMarkers().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test marker showAll function', () => {
    const wrapper = createMarker()
    expect(wrapper.vm.showAll).to.be.an('function')
  })

  it('test marker hideAll function', () => {
    const wrapper = createMarker()
    expect(wrapper.vm.hideAll).to.be.an('function')
  })
})
