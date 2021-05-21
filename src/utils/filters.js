import moment from 'moment'

let Filters = {}
Filters.defaultString = function(str, defStr) {
  return str && str !== '' ? str : defStr
}
Filters.month = function(el) {
  console.log('date', el)
  //TODO use day.js instead, remove moment, it's duplicated
  return moment(el).format('YYYY-MM')
}

Filters.day = function(el) {
  if (el == null || el === '') {
    return ''
  }
  return moment(el).format('YYYY-MM-DD')
}
Filters.formatDay = function(el) {
  if (el == null || el === '') {
    return ''
  }
  return moment(el).format('MM/DD/YYYY')
}

Filters.minute = function(el) {
  return moment(el).format('YYYY-MM-DD HH:mm')
}

Filters.second = function(el) {
  return moment(el).format('YYYY-MM-DD HH:mm:ss')
}
Filters.formatSecond = function(el) {
  return moment(el).format('MM/DD/YYYY HH:mm:ss')
}
Filters.yesOrNoOptions = function(answer) {
  switch (answer) {
    case 'y':
      return 'YES'
    case 'n':
      return 'NO'
    default: {
      return ''
    }
  }
}

Filters.dayStatus = function(type) {
  switch (type) {
    case 'AE':
      return '#FFEEA0'
    case 'UE':
      return '#666'
    case 'BK':
      return '#ccc'
    case 'CI':
      return '#FF9892'
    case 'CT':
      return '#0ff'
    case 'CL':
      return '#f00'
    default: {
      return '#ccc'
    }
  }
}

Filters.age = function(strBirthday) {
  // console.log('birthday: ' + strBirthday)
  if (strBirthday == null || strBirthday === '') {
    return ''
  }
  let returnAge

  let birthday = new Date(strBirthday)
  // 根据生日计算年龄（"1995-09-25"）
  //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
  let strBirthdayArr = strBirthday.split('-')
  let birthYear = birthday.getFullYear()
  if (birthYear < 1930) {
    return ''
  }
  let birthMonth = birthday.getMonth()
  let birthDay = birthday.getDate()

  let d = new Date()
  let nowYear = d.getFullYear()
  let nowMonth = d.getMonth() + 1
  let nowDay = d.getDate()

  if (nowYear === birthYear) {
    returnAge = 0 //同年 则为0岁
  } else {
    let ageDiff = nowYear - birthYear //年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        let dayDiff = nowDay - birthDay //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        let monthDiff = nowMonth - birthMonth //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge //返回周岁年龄
}

Filters.fileIcon = function(file) {
  if (file.type === 'dir') {
    return 'folder'
  }

  let ext = (file.ext || '').toLowerCase()
  if (ext === 'pdf') {
    return 'pdf'
  }
  if (ext === 'xls' || ext === 'xlsx') {
    return 'excel'
  }
  if (ext === 'doc' || ext === 'docx') {
    return 'word'
  }
  return 'document'
}

Filters.fixed = function(val) {
  val = Number(val)
  return val.toFixed(2)
}

Filters.fileName = function(file) {
  if (!file.path) {
    return ''
  }

  let path = process.env.VUE_APP_FS_BASE + file.path
  if (file.name && file.name !== '') {
    path = path.replace(',', '/')
    path = path + '/' + file.name
  }
  return path
}

Filters.shortenFileName = function(fileName, len) {
  if (!fileName) {
    return ''
  }
  if (fileName.length <= len) {
    return fileName
  }
  if (fileName.indexOf('.') > 0) {
    let ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)
    if (ext.length >= len) {
      return (
        fileName.substring(0, len - ext.length - 3) +
        '...' +
        fileName.substring(
          fileName.length - ext.length - 3,
          fileName.length - ext.length - 1
        ) +
        '.' +
        ext.substring(0, 5)
      )
    }
    return fileName.substring(0, len - ext.length - 1) + '...' + '.' + ext
  }

  return fileName.substring(0)
}

Filters.sentTimes = function(times) {
  if (!times) {
    return 'First:0 Past Due:0 Final:0'
  }
  return (
    'First:' +
    (times.first || '0') +
    ' Past Due:' +
    (times.pastDue || '0') +
    ' Final:' +
    (times.final || '0')
  )
}

export default Filters
