import MapOptions from '../packages/utils/map-options'

describe('test MapOptions util library', () => {
  const mapOptions = MapOptions.getOptionsInstance()

  test('MapOptions instance are not empty', () => {
    expect(mapOptions).toEqual({ options: null })
  })

  test('getOptions test', () => {
    expect(mapOptions.getOptions()).toBe(null)
  })

  test('setOptions test', () => {
    mapOptions.setOptions({ key: 'x', version: '1.2' })
    expect(mapOptions.getOptions()).toEqual({ key: 'x', version: '1.2' })
  })
})
