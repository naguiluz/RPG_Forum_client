import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexAllWorlds } from '../../api/world'
import { showIndexSuccess, showIndexFailure } from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import './IndexWorld.scss'
// import './world.scss'
// import './IndexWorld.scss'
// create index of all worlds class and constructor with state
class IndexAllWorlds extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      world: null,
      loading: true
    }
  }

  // occurs on page render first time
  componentDidMount () {
    const { user, msgAlert } = this.props
    // API call for index of all worlds
    indexAllWorlds(user)
      .then((response) =>
        this.setState({
          world: response.data.worlds,
          loading: false
        })
      )
      .then(() =>
        msgAlert({
          heading: 'Index Success',
          message: showIndexSuccess,
          variant: 'success'
        })
      )
      .catch(() =>
        msgAlert({
          heading: 'Index Fail',
          message: showIndexFailure,
          variant: 'danger'
        })
      )
  }

  render () {
    // if statement handles the issue when state is null
    // cannot handle initial render with null.
    if (this.state.world === null) {
      return 'loading...'
    }
    // variable to save array.map()
    if (this.world === null) {
      <h3>No world</h3>
    }

    // create list of worlds
    console.log(this.state.world)
    const worldJsx = this.state.world.map((world) => (
      <li key={world.id}>
        <Card className='box-world' style={{ width: '80%' }}>
          <Card.Body className='bg-box'>
            <Link className='link-title' to={`/worlds/${world.id}`}>
              <Card.Title className='title-world'>{world.name}</Card.Title>
            </Link>
            {/* <Card.Subtitle className='mb-2 text-muted'>
            Creator: {world.owner}
            </Card.Subtitle> */}
            <Card.Subtitle className='mb-2 text-muted'>
            Game: {world.game}
            </Card.Subtitle>
            <Card.Subtitle className='mb-2 text-muted'>
            Setting: {world.setting}
            </Card.Subtitle>
            <Card.Text>Description: {world.description}</Card.Text>
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
        <ul>{worldJsx.reverse()}</ul>
      </div>
    )
  }
}

export default withRouter(IndexAllWorlds)
