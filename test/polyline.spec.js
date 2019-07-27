import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'

const { mapOptions, FastMap, FastPolyline } = FastAMap

function createPolyline(callback) {
  return mount(FastPolyline, {
    propsData: {
      mid: 'polyline',
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

describe('FastPolyline', () => {
  mapOptions.setOptions({
    key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
    version: '1.4.15'
  })

  const mapWrapper = mount(FastMap, {
    propsData: {
      mid: 'polyline'
    }
  })

  it('test polyline click events', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolyline((event, map) => {
          expect(event).to.be.an('object')
          expect(map.CLASS_NAME).to.equal('AMap.Map')
          expect(map).to.eql(mapWrapper.vm.getMapInstance())
          done()
        })
        setTimeout(() => {
          const polyline = wrapper.vm.getPolylineByProp('myData', 1)
          if (polyline.bf.click[0].tb) {
            // 模拟 polyline 覆盖物点击事件
            polyline.bf.click[0].tb({ type: 'click' })
          }
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getPolylineByProp function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolyline()
        setTimeout(() => {
          const polyline = wrapper.vm.getPolylineByProp('myData', 1)
          expect(polyline).to.be.an('object')
          expect(polyline.CLASS_NAME).to.be.a('string')
          expect(polyline.CLASS_NAME).to.equal('AMap.Polyline')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getPolylineByProps function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolyline()
        setTimeout(() => {
          const polylines = wrapper.vm.getPolylineByProps('myData', [1, 2])
          expect(polylines.length).to.be.equal(2)
          expect(polylines).to.be.an('array')
          expect(polylines[0].CLASS_NAME).to.be.a('string')
          expect(polylines[1].CLASS_NAME).to.equal('AMap.Polyline')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test polyline getAllPolylines function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolyline()
        setTimeout(() => {
          const polylines = wrapper.vm.getAllPolylines()
          expect(polylines).to.be.an('array')
          expect(polylines.length).to.be.equal(2)
          expect(polylines[0].CLASS_NAME).to.equal('AMap.Polyline')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test polyline addPolylines function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolyline()
        setTimeout(() => {
          const polylines = wrapper.vm.getAllPolylines()
          expect(polylines.length).to.be.equal(2)

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

          wrapper.vm.addPolylines(options)
          expect(wrapper.vm.getAllPolylines().length).to.be.equal(4)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test polyline removePolylines function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolyline()
        setTimeout(() => {
          const polylines = wrapper.vm.getAllPolylines()
          expect(polylines).to.be.an('array')
          expect(polylines.length).to.be.equal(2)
          wrapper.vm.removePolylines(polylines, 'myData')
          expect(wrapper.vm.getAllPolylines().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test polyline clearAll function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createPolyline()
        setTimeout(() => {
          const polylines = wrapper.vm.getAllPolylines()
          expect(polylines).to.be.an('array')
          expect(polylines.length).to.be.equal(2)
          wrapper.vm.clearAll()
          expect(wrapper.vm.getAllPolylines().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test polyline showAll function', () => {
    const wrapper = createPolyline()
    expect(wrapper.vm.showAll).to.be.an('function')
  })

  it('test polyline hideAll function', () => {
    const wrapper = createPolyline()
    expect(wrapper.vm.hideAll).to.be.an('function')
  })
})
