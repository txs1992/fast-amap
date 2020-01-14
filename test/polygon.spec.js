import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'
import { get } from 'noshjs'

const { mapOptions, FastMap, FastPolygon } = FastAMap

function createPolygon(callback) {
  return mount(FastPolygon, {
    propsData: {
      mid: 'polygon',
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
      styleOption: {
        padding: '.75rem 1.25rem',
        'margin-bottom': '1rem',
        'border-radius': '.25rem',
        'background-color': 'white',
        width: '15rem',
        'border-width': 0,
        'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
        'text-align': 'center',
        'font-size': '20px',
        color: 'blue'
      }
    },
    listeners: {
      click: callback ? callback : () => {}
    }
  })
}

describe('FastPolygon', () => {
  mapOptions.setOptions({
    key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
    version: '1.4.15'
  })

  const mapWrapper = mount(FastMap, {
    propsData: {
      mid: 'polygon'
    }
  })

  it('test polygon click events', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolygon((event, map) => {
          expect(event).to.be.an('object')
          expect(map.CLASS_NAME).to.equal('AMap.Map')
          expect(map).to.eql(mapWrapper.vm.getMapInstance())
          done()
        })
        setTimeout(() => {
          const polygon = wrapper.vm.getInstanceByProp('myData', 1)
          if (get(polygon, ['df', 'click', 0, 'tb'], null)) {
            // 模拟 polygon 覆盖物点击事件
            polygon.df.click[0].tb({ type: 'click' })
          }
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getInstanceByProp function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolygon()
        setTimeout(() => {
          const polygon = wrapper.vm.getInstanceByProp('myData', 1)
          expect(polygon).to.be.an('object')
          expect(polygon.CLASS_NAME).to.be.a('string')
          expect(polygon.CLASS_NAME).to.equal('AMap.Polygon')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getInstanceByProps function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolygon()
        setTimeout(() => {
          const polygons = wrapper.vm.getInstanceByProps('myData', [1, 2])
          expect(polygons.length).to.be.equal(2)
          expect(polygons).to.be.an('array')
          expect(polygons[0].CLASS_NAME).to.be.a('string')
          expect(polygons[1].CLASS_NAME).to.equal('AMap.Polygon')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test polygon getAll function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolygon()
        setTimeout(() => {
          const polygons = wrapper.vm.getAll()
          expect(polygons).to.be.an('array')
          expect(polygons.length).to.be.equal(2)
          expect(polygons[0].CLASS_NAME).to.equal('AMap.Polygon')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test polygon addPolygons function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolygon()
        setTimeout(() => {
          const polygons = wrapper.vm.getAll()
          expect(polygons.length).to.be.equal(2)

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

          wrapper.vm.addPolygons(options)
          expect(wrapper.vm.getAll().length).to.be.equal(4)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test polygon removePolygons function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolygon()
        setTimeout(() => {
          const polygons = wrapper.vm.getAll()
          expect(polygons).to.be.an('array')
          expect(polygons.length).to.be.equal(2)
          wrapper.vm.removePolygons(polygons, 'myData')
          expect(wrapper.vm.getAll().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test polygon clearAll function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolygon()
        setTimeout(() => {
          const polygons = wrapper.vm.getAll()
          expect(polygons).to.be.an('array')
          expect(polygons.length).to.be.equal(2)
          wrapper.vm.clearAll()
          expect(wrapper.vm.getAll().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test polygon showAll function', () => {
    const wrapper = createPolygon()
    expect(wrapper.vm.showAll).to.be.an('function')
  })

  it('test polygon hideAll function', () => {
    const wrapper = createPolygon()
    expect(wrapper.vm.hideAll).to.be.an('function')
  })
})
