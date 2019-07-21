import mapLoader from '../packages/utils/map-loader'

const testPromise = function() {
  return new Promise((resolve, reject) => {
    resolve('test')
  })
}

describe('ES6 spec', function() {
  it('es6 arrows feature ', function() {
    var add = (x, y) => x + y
    console.log(add(3, 1))
  })

  it('maplaoder test', done => {
    mapLoader('d2d76e2274bf5973ecfb1f68454b6f3b', '1.4.15').then(() => {
      done()
    })
  })
})
