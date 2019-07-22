import { expect } from 'chai'
import Map from '../packages/utils/map-shim'
import mapLoader from '../packages/utils/map-loader'
import MapOptions from '../packages/utils/map-options'
import MapRegistry from '../packages/utils/map-instance-registry'

describe('MapRegistry', () => {
  it('getRegistryInstance are not empty', () => {
    const registry = MapRegistry.getRegistryInstance()
    expect(MapRegistry.getRegistryInstance()).to.eql(registry)
    expect(registry).to.have.any.keys('registry', 'map')
  })

  it('test getMap function', () => {
    const registry = MapRegistry.getRegistryInstance()
    expect(registry.getMap()).to.be.undefined
    expect(registry.getMap(1)).to.be.undefined
  })

  it('test setMap function', () => {
    const registry = MapRegistry.getRegistryInstance()
    expect(registry.setMap(12, { mid: 12 })).to.be.undefined
    expect(registry.getMap(12)).to.eql({ mid: 12 })
  })

  it('test deleteMap function', () => {
    const registry = MapRegistry.getRegistryInstance()
    expect(registry.deleteMap(12)).to.be.undefined
    expect(registry.getMap(12)).to.be.undefined
  })
})

describe('MapOptions', () => {
  const mapOptions = MapOptions.getOptionsInstance()

  it('getOptionsInstance are not empty', () => {
    expect(MapOptions.getOptionsInstance()).to.eql(mapOptions)
    expect(MapOptions.getOptionsInstance()).to.eql({ options: null })
  })

  it('getOptions test', () => {
    expect(mapOptions.getOptions()).to.be.null
  })

  it('setOptions test', () => {
    mapOptions.setOptions({ key: 'x', version: '1.2' })
    expect(mapOptions.getOptions()).to.eql({ key: 'x', version: '1.2' })
  })
})

describe('MapShim', () => {
  const mapShim = new Map()

  it('test set function', () => {
    expect(mapShim.set).to.be.an('function')
    expect(mapShim.set(1, { name: 'mt' })).to.eql(mapShim)
  })

  it('test get function', () => {
    expect(mapShim.get).to.be.an('function')
    expect(mapShim.get(1)).to.eql({ name: 'mt' })
  })

  it('test has function', () => {
    expect(mapShim.has).to.be.an('function')
    expect(mapShim.has(1)).to.be.true
    expect(mapShim.has(2)).to.be.false
  })

  it('test delete function', () => {
    expect(mapShim.delete).to.be.an('function')
    expect(mapShim.delete(1)).to.be.true
    expect(mapShim.delete(2)).to.be.false
  })

  it('test clear function', () => {
    expect(mapShim.clear).to.be.an('function')
    mapShim.set(1, { name: 'mt' })
    expect(mapShim.size).to.equal(1)
    mapShim.clear()
    expect(mapShim.size).to.equal(0)
  })

  it('test values function', () => {
    expect(mapShim.values).to.be.an('function')
    mapShim.set(1, { name: 'mt' })
    expect(mapShim.values()).to.eql([{ name: 'mt' }])
  })

  it('test entries function', () => {
    expect(mapShim.entries).to.be.an('function')
    mapShim.set(2, { name: 'txs1992' })
    expect(mapShim.entries()).to.eql([
      [1, { name: 'mt' }],
      [2, { name: 'txs1992' }]
    ])
  })
})
