export default function Map() {
  let maps = [] // maps = [[k,v],[k,v]]

  function set(key, value) {
    const result = find(key)
    if (result) {
      maps[result.index][1] = value
    } else {
      maps.push([key, value])
      this.size++
    }
    return this
  }

  function get(key) {
    const result = find(key)
    return result && result.value
  }

  function has(key) {
    if (find(key)) return true
    return false
  }

  function remove(key) {
    const result = find(key)
    if (!result) return false
    maps.splice(result.index, 1)
    this.size--
    return true
  }

  function clear() {
    maps = []
    this.size = 0
  }

  function find(key) {
    for (let i = 0; i < maps.length; i++) {
      if (maps[i][0] === key) return { index: i, value: maps[i][1], key }
    }
  }

  function values() {
    return maps.map(item => item[1])
  }

  function entries() {
    return maps.slice()
  }

  return {
    get,
    set,
    has,
    size: 0,
    clear,
    values,
    entries,
    delete: remove
  }
}
