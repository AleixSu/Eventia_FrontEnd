const url = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export const API = async ({
  endpoint,
  method = 'GET',
  body,
  isJSON = true,
  token = null
}) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  isJSON ? (headers['Content-Type'] = 'application/json') : null

  const res = await fetch(url + endpoint, {
    body: isJSON ? JSON.stringify(body) : body,
    method,
    headers
  })

  const data = await res.json()

  return { status: res.status, data }
}
