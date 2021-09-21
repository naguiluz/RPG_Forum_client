/* eslint-disable camelcase */
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createCharacter } from '../../api/character'
import { createCharacterSuccess, createCharacterFailure } from '../AutoDismissAlert/messages'
// import './post.scss'

// create class, constructor, and state for Create Character
class CreateCharacter extends Component {
  constructor (props) {
    super(props)

    this.state = {
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

  // changes state of input values
  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  // create a post on click
  onCreateCharacter = (event) => {
    // prevent page refresh on click
    event.preventDefault()
    // destructuring props for use later
    const { msgAlert, history, user } = this.props
    // create a post API call
    createCharacter(this.state, user)
      .then(() =>
        msgAlert({
          heading: 'Character Created',
          message: createCharacterSuccess,
          variant: 'success'
        })
      )
      // redirect after character created
      .then((res) => history.push('/characters/'))
      .catch((error) => {
        // this.setState({
        //   game: '',
        //   name: '',
        //   setting: '',
        //   description: ''
        // })
        msgAlert({
          heading: 'Failed with error: ' + error.message,
          message: createCharacterFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructuring state for later use
    const { game, name, level, race, discipline, background, description, abilities, items, backstory } = this.state
    // create create character form
    return (
      <>
        <div className='row' id='showCharacter'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <center>
              <h3 className='register'>The block of clay before you is eager to be sculpted...</h3>
            </center>
            <Form onSubmit={this.onCreateCharacter} class="characterForm">
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
                  type='number'
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
                    SCULPT
                </Button>
              </div>
              <br />
              <div>
                <Link to={'/characters/'}>
                  <Button variant='btn btn-secondary' className='d-grid gap-2 col-6 mx-auto' class='cancel'>
                      CANCEL
                  </Button>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(CreateCharacter)
