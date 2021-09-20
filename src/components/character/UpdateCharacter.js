import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// API request
import { updateCharacter, showCharacter } from '../../api/character'
import { updateCharacterSuccess, updateCharacterFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import './post.scss'
// create class for update character with constructor and state
class UpdateCharacter extends Component {
  constructor (props) {
    super(props)

    this.state = {
      character: {
        game: '',
        name: '',
        level: '',
        race: '',
        discipline: '',
        background: '',
        description: '',
        abilities: '',
        items: '',
        backstory: ''
      }
    }
  }

  // on page load
  componentDidMount () {
    // destructuring props for later use
    const { match, user, msgAlert } = this.props
    // show character API call
    showCharacter(match.params.id, user)
      // sets new state of character
      .then(res => this.setState({ character: res.data.character }))
      .catch(err => msgAlert({
        heading: 'Show Character failed',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

    // handles state change for input
    handleChange = (event) => {
      const userInput = { [event.target.name]: event.target.value }
      this.setState(currState => {
        // "Spread" out current character state key/value pairs
        return { character: { ...currState.character, ...userInput } }
      })
    }

    // updates character on click
    onUpdateCharacter = (event) => {
      // prevent page reload
      event.preventDefault()
      // destructuring props for later use
      const { user, msgAlert, history, match } = this.props
      // updateCharacter API call
      updateCharacter(this.state.character, match.params.id, user)
        .then(() => msgAlert({
          heading: 'Character Updated',
          message: updateCharacterSuccess,
          variant: 'success'
        }))
        .then(res => history.push('/characters'))
        .catch(() => {
          msgAlert({
            heading: 'Character update failed',
            message: updateCharacterFailure,
            variant: 'danger'
          })
        })
    }

    render () {
      // destructuring state of character for later use
      const { game, name, level, race, discipline, background, description, abilities, items, backstory } = this.state.character
      // update character form
      return (
        <>
          <div className='row' id='showCharacter'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
              <center>
                <h3 className='register'>The block of clay before you is eager to be sculpted...</h3>
              </center>
              <Form onSubmit={this.onUpdateCharacter}>
                <Form.Group controlId='game'>
                  <Form.Label>What are the laws of nature your character is bound by?</Form.Label>
                  <Form.Control
                    required
                    name='game'
                    value={game}
                    placeholder='Rule Set'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId='name'>
                  <Form.Label>What name shall the ballads sing?:</Form.Label>
                  <Form.Control
                    required
                    name='name'
                    value={name}
                    placeholder='Character Name'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId='level'>
                  <Form.Label>What level of skill does your Character posses?:</Form.Label>
                  <Form.Control
                    name='level'
                    value={level}
                    placeholder='Character Level'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId='race'>
                  <Form.Label>From what lineage does your Character descend?:</Form.Label>
                  <Form.Control
                    name='race'
                    value={race}
                    placeholder='Character Race'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId='discipline'>
                  <Form.Label>What discipline does your Character study?:</Form.Label>
                  <Form.Control
                    name='discipline'
                    value={discipline}
                    placeholder='Character Class'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId='background'>
                  <Form.Label>In what conditions or profession has your Character lived their life?:</Form.Label>
                  <Form.Control
                    name='background'
                    value={background}
                    placeholder='Character Background'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId='description'>
                  <Form.Label>Description of the appearance and mannerisms of your Character:</Form.Label>
                  <Form.Control
                    required
                    name='description'
                    value={description}
                    placeholder='Description'
                    as='textarea'
                    rows={4}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId='abilities'>
                  <Form.Label>What special abilities does your Character posses?:</Form.Label>
                  <Form.Control
                    name='abilities'
                    value={abilities}
                    placeholder='Character Abilities'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId='items'>
                  <Form.Label>With what does your Character do battle? What trinkets or artifacts do they hold dear?:</Form.Label>
                  <Form.Control
                    name='items'
                    value={items}
                    placeholder='Character Weapons and Items'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId='backstory'>
                  <Form.Label>Who is your Character? What tales do they have to tell?:</Form.Label>
                  <Form.Control
                    name='backstory'
                    value={backstory}
                    placeholder='Character Backstory'
                    as='textarea'
                    rows={4}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <div className='d-grid gap-2 col-6 mx-auto'>
                  <Button variant='btn btn-secondary' type='submit'>
                    GIVE THEM LIFE
                  </Button>
                </div>
                <Link to={'/worlds/'} className="btn btn-primary">Cancel</Link>
              </Form>
            </div>
          </div>
        </>
      )
    }
}

export default withRouter(UpdateCharacter)
