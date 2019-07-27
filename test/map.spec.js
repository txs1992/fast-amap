import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'

const { mapOptions, FastMap } = FastAMap

describe('FastMap', () => {
  mapOptions.setOptions({
    key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
    version: '1.4.15'
  })

  const wrapper = mount(FastMap, {
    propsData: {
      mid: 'map'
    }
  })

  it('renders the correct markup', () => {
    const content =
      '<div class="cpt-fast-map" style="height: 600px;"><div class="fast-map-slot-container"></div></div>'
    expect(wrapper.html()).to.contains(content)
    expect(wrapper.name()).to.equal('FastMap')
  })

  it('emit map complete evnets', done => {
    wrapper.vm
      .getAMapPromise()
      .then(() => {
        setTimeout(() => {
          wrapper.vm.$emit('complete', wrapper.vm.getMapInstance())
          const map = wrapper.emitted().complete[0][0]
          expect(map).to.be.an('object')
          expect(map.CLASS_NAME).to.be.a('string')
          expect(map.CLASS_NAME).to.equal('AMap.Map')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getMapInstance', done => {
    wrapper.vm
      .getAMapPromise()
      .then(() => {
        setTimeout(() => {
          const instance = wrapper.vm.getMapInstance()
          expect(instance).to.be.an('object')
          expect(instance.CLASS_NAME).to.be.a('string')
          expect(instance.CLASS_NAME).to.equal('AMap.Map')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getAMapInstance', done => {
    wrapper.vm
      .getAMapPromise()
      .then(() => {
        setTimeout(() => {
          const amap = wrapper.vm.getAMapInstance()
          expect(amap).to.be.an('object')
          expect(amap.v).to.be.a('string')
          expect(amap.v).to.equal('1.4.15')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getAMapPromise', done => {
    wrapper.vm
      .getAMapPromise()
      .then(amap => {
        expect(amap).to.be.an('object')
        expect(amap.v).to.be.a('string')
        expect(amap.v).to.equal('1.4.15')
        done()
      })
      .catch(() => done(new Error()))
  })
})
