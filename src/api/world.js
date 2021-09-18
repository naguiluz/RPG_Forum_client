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

// Index request
// no data, we will need a token
export const indexAllWorlds = (user) => {
  return axios({
    // method key sets the HTTP verb/method for this request
    // GET is the default method, so we can include or not up to us
    method: 'GET',
    url: apiUrl + '/worlds/',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// GET /worlds/:id, requires token
export const showWorld = (id, user) => {
  return axios({
    url: apiUrl + '/worlds/' + id,
    // method is optional, default is GET
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
