import ky, { HTTPError } from 'ky'
import { ACCESS_TOKEN_KEY } from '@/config/constants'

export function isAuthenticated(): boolean {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

  return accessToken != null && accessToken.length > 0
}

export async function request<T>(url: string, options: object): Promise<T> {
  return await ky(url, options).json()
}

export async function requestWithAuthHeader(url: string, options: object) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

  try {
    return await ky(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      ...options
    }).json()
  } catch (error) {
    console.log(error)
    const httpError = error as HTTPError

    if (httpError.response.status === 401) {
      window.location.href = '/login'
    }
  }
}

export async function getWithAuthHeader(url: string) {
  const options = {
    method: 'get'
  }

  return requestWithAuthHeader(url, options)
}

export async function postWithAuthHeader(url: string, json: object) {
  const options = {
    method: 'post',
    json
  }

  return requestWithAuthHeader(url, options)
}

export async function deleteWithAuthHeader(url: string) {
  const options = {
    method: 'delete'
  }

  return requestWithAuthHeader(url, options)
}
