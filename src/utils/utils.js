var util = {}

util.of = function(obj, field) {
  if (obj == null) {
    return ''
  }

  return obj[field]
}

util.v = function(obj) {
  if (obj == null) {
    return ''
  }

  return obj.v
}

util.ynd = function(obj) {
  if (obj == null) {
    return ''
  }

  let v = obj.v === 'y' ? 'Yes' : obj.v === 'n' ? 'No' : 'N/A'
  if (!obj.d || obj.d === '') {
    return v
  }
  return v + ', ' + obj.d
}

util.fillObjectChildren = function(obj, childrenNames) {
  for (let i = 0; i < childrenNames.length; i++) {
    if (obj[childrenNames[i]] == null) {
      obj[childrenNames[i]] = {}
    }
  }
}

export default util
