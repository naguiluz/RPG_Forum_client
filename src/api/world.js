import apiUrl from '../apiConfig'
import axios from 'axios'

// Create World
export const createWorld = (data, user) => {
  return axios({
    url: apiUrl + '/worlds/',
    method: 'POST',
    data: {
      world: {
        game: data.game,
        name: data.name,
        setting: data.setting,
        description: data.description
      }
    },
    headers: {
      Authorization: 'Token ' + user.token
    }
  })
}
