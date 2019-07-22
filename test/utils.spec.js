import { expect } from 'chai'
import Map from '../packages/utils/map-shim'
import mapLoader from '../packages/utils/map-loader'
import MapOptions from '../packages/utils/map-options'
import MapRegistry from '../packages/utils/map-instance-registry'

describe('MapRegistry', () => {
  it('getRegistryInstance are not empty', () => {
    const registry = MapRegistry.getRegistryInstance()
    expect(MapRegistry.getRegistryInstance()).to.deep.equal(registry)
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
    expect(registry.getMap(12)).to.deep.equal({ mid: 12 })
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
    expect(MapOptions.getOptionsInstance()).to.deep.equal(mapOptions)
    expect(MapOptions.getOptionsInstance()).to.deep.equal({ options: null })
  })

  it('getOptions test', () => {
    expect(mapOptions.getOptions()).to.be.null
  })

  it('setOptions test', () => {
    mapOptions.setOptions({ key: 'x', version: '1.2' })
    expect(mapOptions.getOptions()).to.deep.equal({ key: 'x', version: '1.2' })
  })
})
