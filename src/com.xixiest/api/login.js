import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: '/auth/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}
