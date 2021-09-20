import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexAllCharacters } from '../../api/character'
import { showCharacterIndexSuccess, showCharacterIndexFailure } from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
// import Character from './CharacterComponent'
// import './character.scss'
// import './Indexcharacter.scss'
// create index of all characters class and constructor with state
class IndexAllCharacters extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      character: null,
      loading: true
    }
  }

  // occurs on page render first time
  componentDidMount () {
    const { user, msgAlert } = this.props
    // API call for index of all characters
    indexAllCharacters(user)
      .then((response) =>
        this.setState({
          character: response.data.characters,
          loading: false
        })
      )
      .then(() =>
        msgAlert({
          heading: 'Index Success',
          message: showCharacterIndexSuccess,
          variant: 'success'
        })
      )
      .catch(() =>
        msgAlert({
          heading: 'Index Fail',
          message: showCharacterIndexFailure,
          variant: 'danger'
        })
      )
  }

  render () {
    // if statement handles the issue when state is null
    // cannot handle initial render with null.
    if (this.state.character === null) {
      return 'loading...'
    }
    // variable to save array.map()
    // if (this.state.character === null) {
    //   return <h3>No Characters</h3>
    // }

    // create list of characters
    // console.log(this.state.character)
    // const { name, game, level, race, discipline, background, abilities, items, description, backstory } = this.state.character
    const characterJsx = this.state.character.map((character) => (
      <li key={character.id}>
        {/* <Character
          name={name}
          game={game}
          level={level}
          race={race}
          discipline={discipline}
          background={background}
          abilities={abilities}
          items={items}
          description={description}
          backstory={backstory}
        /> */}
        <Card className='box-character' style={{ width: '80%' }}>
          <Card.Body className='bg-box'>
            <Link className='link-title' to={`/characters/${character.id}`}>
              <Card.Title className='title-character'>{character.name}</Card.Title>
            </Link>
            <Card.Subtitle className='mb-2 text-muted'>
            Creator: {character.owner}
            </Card.Subtitle>
            <Card.Subtitle className='mb-2 text-muted'>
            Game: {character.game}
            </Card.Subtitle>
            <Card.Subtitle className='mb-2 text-muted'>
            Level:  {character.level}
            </Card.Subtitle>
            <Card.Subtitle className='mb-2 text-muted'>
            Race: {character.race}
            </Card.Subtitle>
            <Card.Subtitle className='mb-2 text-muted'>
            Class:  {character.discipline}
            </Card.Subtitle>
            <Card.Subtitle className='mb-2 text-muted'>
            Background: {character.background}
            </Card.Subtitle>
            <Card.Subtitle className='mb-2 text-muted'>
            Features and Abilities: {character.abilities}
            </Card.Subtitle>
            <Card.Subtitle className='mb-2 text-muted'>
            Weapons and Items:  {character.items}
            </Card.Subtitle>
            <Card.Text>Description: {character.description}</Card.Text>
            <Card.Text>Backstory: {character.backstory}</Card.Text>
          </Card.Body>
        </Card>
        <br />
      </li>
    ))

    return (
      <div>

        {/* <br />
        <h1 className='topic'>Share your thought ..</h1>

        <NavLink to='/create-post'>
          <button
            type='button'
            className='btn btn-secondary btn-lg'
            id='create-btn'>
                        Create Post
          </button>
        </NavLink> */}
        <p>{this.state.loading && 'loading ...'}</p>

        {/* display posts */}
        <ul>{characterJsx.reverse()}</ul>
      </div>
    )
  }
}

export default withRouter(IndexAllCharacters)
