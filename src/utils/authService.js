import cookie from 'react-cookie'
import { COOKIE_DOMAIN } from '../../config'
let cookieConfig = {}
if(COOKIE_DOMAIN !== ''){
  cookieConfig = { domain: COOKIE_DOMAIN }
}

export function saveCookie(name,value) {
  cookie.save(name, value, cookieConfig)
}

export function getCookie(name) {
  return cookie.load(name)
}

export function removeCookie(name) {
  cookie.remove(name, cookieConfig)
}

export function signOut() {
  cookie.remove('token', cookieConfig)
}

export function isLogin() {
  return !!cookie.load('token')
}
