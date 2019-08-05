import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'

const { mapOptions, FastMap, FastCircle } = FastAMap

function createCircle(callback) {
  return mount(FastCircle, {
    propsData: {
      mid: 'circle',
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

describe('FastCircle', () => {
  mapOptions.setOptions({
    key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
    version: '1.4.15'
  })

  const mapWrapper = mount(FastMap, {
    propsData: {
      mid: 'circle'
    }
  })

  it('test circle click events', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircle((event, map) => {
          expect(event).to.be.an('object')
          expect(map.CLASS_NAME).to.equal('AMap.Map')
          expect(map).to.eql(mapWrapper.vm.getMapInstance())
          done()
        })
        setTimeout(() => {
          const circle = wrapper.vm.getInstanceByProp('myData', 1)
          if (circle.bf.click[0].tb) {
            // 模拟 circle 覆盖物点击事件
            circle.bf.click[0].tb({ type: 'click' })
          }
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getInstanceByProp function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircle()
        setTimeout(() => {
          const circle = wrapper.vm.getInstanceByProp('myData', 1)
          expect(circle).to.be.an('object')
          expect(circle.CLASS_NAME).to.be.a('string')
          expect(circle.CLASS_NAME).to.equal('AMap.Circle')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getInstanceByProps function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircle()
        setTimeout(() => {
          const circles = wrapper.vm.getInstanceByProps('myData', [1, 2])
          expect(circles.length).to.be.equal(2)
          expect(circles).to.be.an('array')
          expect(circles[0].CLASS_NAME).to.be.a('string')
          expect(circles[1].CLASS_NAME).to.equal('AMap.Circle')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test circle getAll function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircle()
        setTimeout(() => {
          const circles = wrapper.vm.getAll()
          expect(circles).to.be.an('array')
          expect(circles.length).to.be.equal(2)
          expect(circles[0].CLASS_NAME).to.equal('AMap.Circle')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test circle addCircles function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircle()
        setTimeout(() => {
          const circles = wrapper.vm.getAll()
          expect(circles.length).to.be.equal(2)

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

          wrapper.vm.addCircles(options)
          expect(wrapper.vm.getAll().length).to.be.equal(4)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test circle removeCircles function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircle()
        setTimeout(() => {
          const circles = wrapper.vm.getAll()
          expect(circles).to.be.an('array')
          expect(circles.length).to.be.equal(2)
          wrapper.vm.removeCircles(circles, 'myData')
          expect(wrapper.vm.getAll().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test circle clearAll function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createCircle()
        setTimeout(() => {
          const circles = wrapper.vm.getAll()
          expect(circles).to.be.an('array')
          expect(circles.length).to.be.equal(2)
          wrapper.vm.clearAll()
          expect(wrapper.vm.getAll().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test circle showAll function', () => {
    const wrapper = createCircle()
    expect(wrapper.vm.showAll).to.be.an('function')
  })

  it('test circle hideAll function', () => {
    const wrapper = createCircle()
    expect(wrapper.vm.hideAll).to.be.an('function')
  })
})