import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// API request
import { updateWorld, showWorld } from '../../api/world'
import { updateWorldSuccess, updateWorldFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import './post.scss'
// create class for update post with constructor and state
class UpdateWorld extends Component {
  constructor (props) {
    super(props)

    this.state = {
      world: {
        game: '',
        name: '',
        setting: '',
        description: ''
      }
    }
  }

  // on page load
  componentDidMount () {
    // destructuring props for later use
    const { match, user, msgAlert } = this.props
    // show world API call
    showWorld(match.params.id, user)
      // sets new state of world
      .then(res => this.setState({ world: res.data.world }))
      .catch(err => msgAlert({
        heading: 'Show World failed',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

    // handles state change for input
    handleChange = (event) => {
      const userInput = { [event.target.name]: event.target.value }
      this.setState(currState => {
        // "Spread" out current world state key/value pairs
        return { world: { ...currState.world, ...userInput } }
      })
    }

    // updates world on click
    onUpdateWorld = (event) => {
      // prevent page reload
      event.preventDefault()
      // destructuring props for later use
      const { user, msgAlert, history, match } = this.props
      // updateWorld API call
      updateWorld(this.state.world, match.params.id, user)
        .then(() => msgAlert({
          heading: 'World Updated',
          message: updateWorldSuccess,
          variant: 'success'
        }))
        .then(res => history.push('/worlds'))
        .catch(() => {
          msgAlert({
            heading: 'World update failed',
            message: updateWorldFailure,
            variant: 'danger'
          })
        })
    }

    render () {
      // destructuring state of world for later use
      const { game, name, setting, description } = this.state.world
      // update world form
      return (
        <>
          <div className='row' id='showWorld'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
              <h3 className='register'>Transmute World</h3>
              <Form onSubmit={this.onUpdateWorld}>
                <Form.Group controlId='name'>
                  <Form.Label>World Name:</Form.Label>
                  <Form.Control
                    required
                    name='name'
                    value={name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId='game'>
                  <Form.Label>Rule Set:</Form.Label>
                  <Form.Control
                    required
                    name='game'
                    value={game}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId='setting'>
                  <Form.Label>Setting:</Form.Label>
                  <Form.Control
                    required
                    name='setting'
                    value={setting}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId='description'>
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    name='description'
                    value={description}
                    placeholder='description'
                    as='textarea'
                    rows={4}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br />
                <div className='d-grid gap-2 col-6 mx-auto'>
                  <Button variant='btn btn-secondary' type='submit'>
                    TRANSMUTE
                  </Button>
                </div>
                <br />
                <div>
                  <Link to={'/worlds/'}>
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

export default withRouter(UpdateWorld)
