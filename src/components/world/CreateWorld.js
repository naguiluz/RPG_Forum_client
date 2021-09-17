import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createWorld } from '../../api/world'
import { createWorldSuccess, createWorldFailure } from '../AutoDismissAlert/messages'
import './post.scss'

// create class, constructor, and state for Create World
class CreateWorld extends Component {
  constructor (props) {
    super(props)

    this.state = {
      game: '',
      name: '',
      active: '',
      setting_type: '',
      description: ''
    }
  }

  // changes state of input values
  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  // create a post on click
  onCreateWorld = (event) => {
    // prevent page refresh on click
    event.preventDefault()
    // destructuring props for use later
    const { msgAlert, history, user } = this.props
    // create a post API call
    createWorld(this.state, user)
      .then(() =>
        msgAlert({
          heading: 'World Created',
          message: createWorldSuccess,
          variant: 'success'
        })
      )
      // redirect after world created
      .then((res) => history.push('/worlds/'))
      .catch((error) => {
        this.setState({
          game: '',
          name: '',
          active: '',
          setting_type: '',
          description: ''
        })
        msgAlert({
          heading: 'Failed with error: ' + error.message,
          message: createWorldFailure,
          variant: 'danger'
        })
      })
      // redirect after world create failure
      .then(() => history.push('/worlds/'))
  }

  render () {
    // destructuring state for later use
    const { game, name, active, setting_type, description } = this.state
    // create create post form
    return (
      <>
        <div className='row' id='showPost'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <center>
              <h3 className='register'>game</h3>
            </center>
            <Form onSubmit={this.onCreateWorld}>
              <Form.Group controlId='game'>
                <Form.Label>What are the rules your world abides by?</Form.Label>
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
                <Form.Label>World Name:</Form.Label>
                <Form.Control
                  required
                  name='name'
                  value={name}
                  placeholder='name'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <br />
              <Form.Group controlId='active'>
                <Form.Label>World currently being traversed:</Form.Label>
                <Form.Control
                  required
                  input='radio'
                  name='active'
                  value={active}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <br />
              <Form.Group controlId='setting_type'>
                <Form.Label>Setting of your World:</Form.Label>
                <Form.Control
                  name='setting_type'
                  value={setting_type}
                  placeholder='setting_type'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <br />
              <Form.Group controlId='description'>
                <Form.Label>Description of the people, places, and history of your World:</Form.Label>
                <Form.Control
                  required
                  name='description'
                  value={description}
                  placeholder='description'
                  as='textarea'
                  rows={4}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <div className='d-grid gap-2 col-6 mx-auto'>
                <Button variant='btn btn-secondary' type='submit'>
                    Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(CreateWorld)
