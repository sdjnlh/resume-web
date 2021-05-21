// import options from './patientOptions'
let dict = {}

dict.language = [
  { key: 'zh', value: 'Chinese' },
  { key: 'en', value: 'English' }
]
dict.translator = function(value, dictType) {
  let dictMap = dict.map[dictType]

  // console.log('translate: ', value, dictType)
  if (dictMap) {
    if (dictMap[value]) {
      return dictMap[value]
    } else {
      return value
    }
  }

  return value
}

function optionsToDict(options) {
  if (!options) {
    return []
  }

  let dictItems = []
  for (let i = 0; i < options.length; i++) {
    let item = options[i]
    dictItems[i] = { key: item.value, value: item.label }
  }

  return dictItems
}

function map() {
  dict.map = {}
  Object.keys(dict).forEach(function(key) {
    let property = dict[key]

    if (property instanceof Array) {
      dict.map[key] = {}

      for (let i = 0; i < property.length; i++) {
        let item = property[i]
        dict.map[key][item.key] = item.value
      }
    }
  })
}

map()
export default dict
