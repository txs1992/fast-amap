import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'

const { mapOptions, FastMap, FastCircleMarker } = FastAMap

function createCircleMarker(callback) {
  return mount(FastCircleMarker, {
    propsData: {
      mid: 'circle-marker',
      options: [
        {
          myData: 1,
          center: [121.472644, 31.231049]
        },
        {
          myData: 2,
          center: [121.482644, 31.231049]
        }
      ],
      draggable: true,
      clickable: true
    },
    listeners: {
      click: callback ? callback : () => {}
    }
  })
}

describe('FastCircleMarker', () => {
  mapOptions.setOptions({
    key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
    version: '1.4.15'
  })

  const mapWrapper = mount(FastMap, {
    propsData: {
      mid: 'circle-marker'
    }
  })

  it('test circleMarker click events', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircleMarker((event, map) => {
          expect(event).to.be.an('object')
          expect(map.CLASS_NAME).to.equal('AMap.Map')
          expect(map).to.eql(mapWrapper.vm.getMapInstance())
          done()
        })
        setTimeout(() => {
          const instance = wrapper.vm.getInstanceByProp('myData', 1)
          if (instance.bf.click[0].tb) {
            // 模拟 circleMarker 覆盖物点击事件
            instance.bf.click[0].tb({ type: 'click' })
          }
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getInstanceByProp function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircleMarker()
        setTimeout(() => {
          const instance = wrapper.vm.getInstanceByProp('myData', 1)
          expect(instance).to.be.an('object')
          expect(instance.CLASS_NAME).to.be.a('string')
          expect(instance.CLASS_NAME).to.equal('AMap.CircleMarker')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getInstanceByProps function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircleMarker()
        setTimeout(() => {
          const instances = wrapper.vm.getInstanceByProps('myData', [1, 2])
          expect(instances.length).to.be.equal(2)
          expect(instances).to.be.an('array')
          expect(instances[0].CLASS_NAME).to.be.a('string')
          expect(instances[1].CLASS_NAME).to.equal('AMap.CircleMarker')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test circleMarker getAll function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircleMarker()
        setTimeout(() => {
          const instances = wrapper.vm.getAll()
          expect(instances).to.be.an('array')
          expect(instances.length).to.be.equal(2)
          expect(instances[0].CLASS_NAME).to.equal('AMap.CircleMarker')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test circleMarker addCircleMarkers function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircleMarker()
        setTimeout(() => {
          const instances = wrapper.vm.getAll()
          expect(instances.length).to.be.equal(2)

          const options = [
            {
              myData: 3,
              center: [121.472644, 31.231049]
            },
            {
              myData: 4,
              center: [121.482644, 31.231049]
            }
          ]

          wrapper.vm.addCircleMarkers(options)
          expect(wrapper.vm.getAll().length).to.be.equal(4)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test circleMarker removeCircleMarkers function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircleMarker()
        setTimeout(() => {
          const instances = wrapper.vm.getAll()
          expect(instances).to.be.an('array')
          expect(instances.length).to.be.equal(2)
          wrapper.vm.removeCircleMarkers(instances, 'myData')
          expect(wrapper.vm.getAll().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test circleMarker clearAll function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircleMarker()
        setTimeout(() => {
          const instances = wrapper.vm.getAll()
          expect(instances).to.be.an('array')
          expect(instances.length).to.be.equal(2)
          wrapper.vm.clearAll()
          expect(wrapper.vm.getAll().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test circleMarker showAll function', () => {
    const wrapper = createCircleMarker()
    expect(wrapper.vm.showAll).to.be.an('function')
  })

  it('test circleMarker hideAll function', () => {
    const wrapper = createCircleMarker()
    expect(wrapper.vm.hideAll).to.be.an('function')
  })
})
