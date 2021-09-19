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
