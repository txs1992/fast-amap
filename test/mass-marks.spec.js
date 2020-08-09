import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'

const { mapOptions, FastMap, FastMassMarks } = FastAMap

function createMassMarks(callback) {
  return mount(FastMassMarks, {
    propsData: {
      mid: 'MassMarks',
      styleOption: {
        url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
        anchor: [4, 4],
        size: [7, 7]
      },
      data: [{ lnglat: [116.258446, 37.686622], name: '景县', style: 2 }]
    }
  })
}

describe('FastMassMarks', () => {
  mapOptions.setOptions({
    key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
    version: '1.4.15'
  })

  const mapWrapper = mount(FastMap, {
    propsData: {
      mid: 'MassMarks'
    }
  })

  it('test getMassMarksInstance function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createMassMarks()
        setTimeout(() => {
          const massMarks = wrapper.vm.getMassMarksInstance()
          expect(massMarks).to.be.an('object')
          expect(massMarks.CLASS_NAME).to.be.a('string')
          expect(massMarks.CLASS_NAME).to.equal('AMap.MassMarks')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })
})
