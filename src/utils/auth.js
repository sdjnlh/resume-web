import Cookies from 'js-cookie'

export function getUsername() {
  // return Cookies.get('username', { domain: 'oms.fertile.com.hk' })
  return Cookies.get('username', { domain: process.env.DOMAIN })
  // return Cookies.get('username')
}

export function getUid() {
  // return Cookies.get('uid')
  return Cookies.get('uid', { domain: process.env.DOMAIN })
  // return Cookies.get('uid', { domain: 'oms.fertile.com.hk' })
}

export function removeUid() {
  return Cookies.remove('uid', { domain: process.env.DOMAIN })
  // return Cookies.remove('uid', { domain: 'oms.fertile.com.hk' })
  // return Cookies.remove('uid')
}
