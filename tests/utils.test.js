import MapOptions from '../packages/utils/map-options'
import MapRegistry from '../packages/utils/map-instance-registry'
import Map from '../packages/utils//map-shim'

describe('test MapOptions util library', () => {
  const mapOptions = MapOptions.getOptionsInstance()

  test('getOptionsInstance are not empty', () => {
    expect(MapOptions.getOptionsInstance()).toEqual(mapOptions)
    expect(MapOptions.getOptionsInstance()).toEqual({ options: null })
  })

  test('getOptions test', () => {
    expect(mapOptions.getOptions()).toBeNull()
  })

  test('setOptions test', () => {
    mapOptions.setOptions({ key: 'x', version: '1.2' })
    expect(mapOptions.getOptions()).toEqual({ key: 'x', version: '1.2' })
  })
})

describe('test MapRegistry util library', () => {
  const registry = MapRegistry.getRegistryInstance()

  test('getRegistryInstance are not empty', () => {
    expect(MapRegistry.getRegistryInstance()).toEqual(registry)
    expect(MapRegistry.getRegistryInstance()).not.toBe({
      registry: null,
      map: new Map()
    })
  })

  test('test the getMap function', () => {
    expect(registry.getMap()).toBeUndefined()
    expect(registry.getMap(1)).toBeUndefined()
  })

  test('test the setMap function', () => {
    expect(registry.setMap(12, { mid: 12 })).toBeUndefined()
    expect(registry.getMap(12)).toEqual({ mid: 12 })
  })

  test('test the deleteMap function', () => {
    expect(registry.deleteMap(12)).toBeUndefined()
    expect(registry.getMap(12)).toBeUndefined()
  })
})
