let fs = {
  types: {
    IMAGE: 'image',
    VIDEO: 'video',
    TD: '3d'
  },
  tags: {
    GALLERY: 'gallery',
    CONTENT: 'content',
    COVER: 'cover'
  }
}
fs.url = function(url, suffix) {
  if (!url || url === '') return ''

  if (url.indexOf('http') === 0) {
    return url
  }

  const index = url.indexOf('/')
  let formated = index === 0 ? url : '/' + url
  if (suffix) {
    formated += suffix
  }
  let formattedUrl = process.env.VUE_APP_FS_BASE + formated
  console.log('format file url', url, suffix, formattedUrl)
  return formattedUrl
}

fs.fileCover = function(file, origin) {
  console.log('format file cover url')
  let url = ''
  if (!file) {
    return url
  }
  if (file.type === fs.types.IMAGE) {
    url = file.url
  } else {
    if (!file.cover) {
      return ''
    } else {
      url = file.cover.url
    }
  }

  // console.log('image url', url)
  url = fs.url(url)
  if (!origin) {
    if (url.indexOf('?') > 0) {
      return url + '&height=120&width=160&mode=fit'
    } else {
      return url + '?height=120&width=160&mode=fit'
    }
  }

  return url
}

fs.courseCover = function(file) {
  return fs.fileCover(file, true)
}

export default fs
