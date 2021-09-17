import apiUrl from '../apiConfig'
import axios from 'axios'

// Create World
export const createWorld = (data, user) => {
  return axios({
    url: apiUrl + '/worlds/',
    method: 'POST',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'Token ' + user.token
    }
  })
}
