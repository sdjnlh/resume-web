import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getUid() {
  return Cookies.get('uid')
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getNickName() {
  return Cookies.get('nickname')
}

export function setNickName(nickname) {
  return Cookies.set('nickname', nickname)
}
export function setUserName(username) {
  return Cookies.set('username', username)
}
export function setUid(id) {
  return Cookies.set('uid', id)
}

export function removeNickName() {
  return Cookies.remove('nickname')
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
