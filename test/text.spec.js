import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FastAMap from '../packages'
import { get } from 'noshjs'

const { mapOptions, FastMap, FastText } = FastAMap

function createText(callback) {
  return mount(FastText, {
    propsData: {
      mid: 'text',
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

describe('FastText', () => {
  mapOptions.setOptions({
    key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
    version: '1.4.15'
  })

  const mapWrapper = mount(FastMap, {
    propsData: {
      mid: 'text'
    }
  })

  // 由于 AMap 实例的属性一直在变，导致 CI 经常不能通过，事件测试用例经常修改，带来不必要的麻烦，这里关闭事件测试用例
  // it('test text click events', done => {
  //   mapWrapper.vm
  //     .getAMapPromise()
  //     .then(() => {
  //       const wrapper = createText((event, map) => {
  //         expect(event).to.be.an('object')
  //         expect(map.CLASS_NAME).to.equal('AMap.Map')
  //         expect(map).to.eql(mapWrapper.vm.getMapInstance())
  //         done()
  //       })
  //       setTimeout(() => {
  //         const text = wrapper.vm.getInstanceByProp('myData', 1)
  //         if (get(text, ['df', 'click', 0, 'tb'], null)) {
  //           // 模拟 text 覆盖物点击事件
  //           text.df.click[0].tb({ type: 'click' })
  //         }
  //       }, 0)
  //     })
  //     .catch(() => done(new Error()))
  // })

  it('test getInstanceByProp function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createText()
        setTimeout(() => {
          const text = wrapper.vm.getInstanceByProp('myData', 1)
          expect(text).to.be.an('object')
          expect(text.CLASS_NAME).to.be.a('string')
          expect(text.CLASS_NAME).to.equal('AMap.Text')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test getAllInstanceByProp function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createText()
        setTimeout(() => {
          const text = wrapper.vm.getAllInstanceByProp('myData', 1)
          expect(text).to.be.an('array')
          expect(text.length).to.equal(1)
          expect(text[0].CLASS_NAME).to.be.a('string')
          expect(text[0].CLASS_NAME).to.equal('AMap.Text')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })


  it('test getInstanceByProps function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createText()
        setTimeout(() => {
          const texts = wrapper.vm.getInstanceByProps('myData', [1, 2])
          expect(texts.length).to.be.equal(2)
          expect(texts).to.be.an('array')
          expect(texts[0].CLASS_NAME).to.be.a('string')
          expect(texts[1].CLASS_NAME).to.equal('AMap.Text')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test text getAll function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createText()
        setTimeout(() => {
          const texts = wrapper.vm.getAll()
          expect(texts).to.be.an('array')
          expect(texts.length).to.be.equal(2)
          expect(texts[0].CLASS_NAME).to.equal('AMap.Text')
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test text addTexts function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createText()
        setTimeout(() => {
          const texts = wrapper.vm.getAll()
          expect(texts.length).to.be.equal(2)

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

          wrapper.vm.addTexts(options)
          expect(wrapper.vm.getAll().length).to.be.equal(4)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test text removeTexts function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createText()
        setTimeout(() => {
          const texts = wrapper.vm.getAll()
          expect(texts).to.be.an('array')
          expect(texts.length).to.be.equal(2)
          wrapper.vm.removeTexts(texts, 'myData')
          expect(wrapper.vm.getAll().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test text clearAll function', done => {
    mapWrapper.vm
      .getAMapPromise()
      .then(() => {
        const wrapper = createText()
        setTimeout(() => {
          const texts = wrapper.vm.getAll()
          expect(texts).to.be.an('array')
          expect(texts.length).to.be.equal(2)
          wrapper.vm.clearAll()
          expect(wrapper.vm.getAll().length).to.be.equal(0)
          done()
        }, 0)
      })
      .catch(() => done(new Error()))
  })

  it('test text showAll function', () => {
    const wrapper = createText()
    expect(wrapper.vm.showAll).to.be.an('function')
  })

  it('test text hideAll function', () => {
    const wrapper = createText()
    expect(wrapper.vm.hideAll).to.be.an('function')
  })
})
