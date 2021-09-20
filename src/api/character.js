import apiUrl from '../apiConfig'
import axios from 'axios'

// Create Character
export const createCharacter = (data, user) => {
  return axios({
    url: apiUrl + '/characters/',
    method: 'POST',
    data: {
      character: {
        game: data.game,
        name: data.name,
        level: data.level,
        race: data.race,
        discipline: data.discipline,
        background: data.background,
        description: data.description,
        abilities: data.abilities,
        items: data.items,
        backstory: data.backstory
      }
    },
    headers: {
      Authorization: 'Token ' + user.token
    }
  })
}

// Index request
// no data, we will need a token
export const indexAllCharacters = (user) => {
  return axios({
    // method key sets the HTTP verb/method for this request
    // GET is the default method, so we can include or not up to us
    method: 'GET',
    url: apiUrl + '/characters/',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// GET /characters/:id, requires token
export const showCharacter = (id, user) => {
  return axios({
    url: apiUrl + '/characters/' + id + '/',
    // method is optional, default is GET
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// DELETE /characters/:id, requires token
export const deleteCharacter = (id, user) => {
  return axios({
    url: apiUrl + '/characters/' + id + '/',
    method: 'DELETE',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// PATCH /characters/:id, requires token
export const updateCharacter = (data, id, user) => {
  return axios({
    url: apiUrl + '/characters/' + id + '/',
    method: 'patch',
    data: {
      world: {
        game: data.game,
        name: data.name,
        level: data.level,
        race: data.race,
        discipline: data.discipline,
        background: data.background,
        description: data.description,
        abilities: data.abilities,
        items: data.items,
        backstory: data.backstory
      }
    },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
