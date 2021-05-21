import crud from './builder'
import request from '@/utils/request'

var API = {}

API.serviceBusiness = crud('v1/serviceBusiness')
API.work = crud("v1/work")
API.project = crud("v1/project")
API.resume = crud("v1/resume")
API.resume.upload=function(params){
  return request.post("v1/resume/upload",params)
}
API.resume.download=function(params){
  return request.get("v1/resume/download",params,{responseType: "blob"})
}
API.app = {
    login: function (param) {
        return request.post('/v1/web/login', param)
    },
    getInfo: function () {
        return request.get('/me')
    },
    logout: function () {
        return request.post('/v1/web/logout')
    }
}
API.fs = {}

API.fs.filter = function (filter) {
    return request.get('v1/files', {
        params: filter
    })
}
export default API
