import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'
import { get } from 'noshjs'

const { mapOptions, FastMap, FastInfoWindow } = FastAMap

function createInfoWindow(callback) {
  return mount(FastInfoWindow, {
    propsData: {
      mid: 'infoWindow'
    },
    listeners: {
      close: callback ? callback : () => {}
    }
  })
}

describe('FastInfoWindow', () => {
  mapOptions.setOptions({
    key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
    version: '1.4.15'
  })

  const mapWrapper = mount(FastMap, {
    propsData: {
      mid: 'infoWindow'
    }
  })

  it('test infoWindow close events', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createInfoWindow(() => {
          done()
        })
        setTimeout(() => {
          const infoWindow = wrapper.vm.getInfoWindowInstance()
          if (get(infoWindow, ['df', 'close', 0, 'tb'])) {
            // 模拟  覆盖物点击事件
            infoWindow.df.close[0].tb({ type: 'close' })
          }
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getInfoWindowInstance function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createInfoWindow()
        setTimeout(() => {
          const infoWindow = wrapper.vm.getInfoWindowInstance()
          expect(infoWindow).to.be.an('object')
          expect(infoWindow.CLASS_NAME).to.be.a('string')
          expect(infoWindow.CLASS_NAME).to.equal('AMap.InfoWindow')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test infoWindow open function', () => {
    const wrapper = createInfoWindow()
    expect(wrapper.vm.open).to.be.an('function')
  })

  it('test infoWindow close function', () => {
    const wrapper = createInfoWindow()
    expect(wrapper.vm.close).to.be.an('function')
  })
})
