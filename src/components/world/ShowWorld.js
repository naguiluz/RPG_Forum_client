import React, { Component } from 'react'
// add Link
import { withRouter } from 'react-router-dom'
// API request
import { showWorld, deleteWorld } from '../../api/world'
// import { deleteComment } from '../../api/comment'
import Button from 'react-bootstrap/Button'
import World from './WorldComponent'
import {
  showWorldFailure, showWorldSuccess, deleteWorldFailure, deleteWorldSuccess
} from '../AutoDismissAlert/messages'
// import './world.scss'
// creates single show world with constructor, state
class ShowWorld extends Component {
  constructor (props) {
    super(props)

    this.state = {
      world: {
        game: '',
        name: '',
        setting: '',
        description: '',
        // image: '',
        // comments: [],
        owner: ''
      }
    }
  }

  // on initial page render
  componentDidMount () {
    // destructuring props for later use
    const { match, user, msgAlert } = this.props
    // show world API call
    showWorld(match.params.id, user)

      // sets state of world
      .then((res) => {
        return this.setState({ world: res.data.world })
      })
      .then(() =>
        msgAlert({
          heading: 'Show world success',
          message: showWorldSuccess,
          variant: 'success'
        })
      )
      .catch(() =>
        msgAlert({
          heading: 'Show world failed',
          message: showWorldFailure,
          variant: 'danger'
        })
      )
  }

  handleDeleteWorld = (event) => {
    const { match, user, msgAlert, history } = this.props
    deleteWorld(match.params.id, user)
    // Redirect to the list of posts
      .then(() => history.push('/worlds'))
      .then(() =>
        msgAlert({
          heading: 'Deleted World successfully',
          message: deleteWorldSuccess,
          variant: 'success'
        })
      )
      .catch(() =>
        msgAlert({
          heading: 'Delete World failed',
          message: deleteWorldFailure,
          variant: 'danger'
        })
      )
  }

  // // handles delete comment
  // handleDeleteComment = (id) => {
  //   // destructuring props for later use
  //   const { match, user, msgAlert, history } = this.props
  //   // delete comment API call
  //   deleteComment(match.params.id, id, user)
  //     .then(() =>
  //       msgAlert({
  //         heading: 'Delete comment successfully',
  //         message: deleteCommentSuccess,
  //         variant: 'success'
  //       })
  //     )
  //   // Redirect to the list of posts
  //     .then(() => history.push('/posts-all/'))
  //     .catch(() =>
  //       msgAlert({
  //         heading: 'Delete post failed :(',
  //         message: deleteCommentFailure,
  //         variant: 'danger'
  //       })
  //     )
  // }

  render () {
    // destructuring state of world for later use
    const { name, game, setting, description, id, owner } = this.state.world
    // if no image show 'default image'
    // if (image === '') {
    return (
      <div>
        {/* bringing in the component World that is accepting passed down data as props */}
        <br />
        <World
          // id='showWorld-bg'
          name={name}
          game={game}
          setting={setting}
          description={description}
          // image={
          //   'https://image.shutterstock.com/image-vector/default-word-digital-style-glowing-600w-1668796114.jpg'
          // }
          // comments={comments}
          owner={owner}
          worldId={id}
          // our functions are passed to WorldComponent
          // onClick={this.handleDeleteComment}
          // onClickUpdate={this.handleUpdateComment}
        />
        <br />
        {/* button to delete world */}
        { this.props.user.id === this.state.world.owner
          ? <Button
            onClick={this.handleDeleteWorld}
            variant='danger'>
                          Delete World
          </Button>
          : '' }
        {/* create comment */}
        {/* <div className='divider' /> */}
        {/* <Link to={`/comments/${id}`} class='btn btn-secondary'>
                          Make Comment
          </Link> */}
      </div>
    )
    // } else {
    //   return (
    //     <div>
    //       {/* bringing in the component Post that is accepting passed down data as props */}
    //       <br />
    //       <Post
    //         id='showPost-bg'
    //         title={title}
    //         subject={subject}
    //         content={content}
    //         image={image}
    //         comments={comments}
    //         userEmail={userEmail}
    //         postId={id}
    //         // our functions are passed to PostForm
    //         onClick={this.handleDeleteComment}
    //         onClickUpdate={this.handleUpdateComment}
    //       />

    //       <br />
    //       { this.props.user.id === this.state.post.owner
    //         ? <Button
    //           onClick={this.handleDeletePost}
    //           variant='danger'>
    //                       Delete Post
    //         </Button>
    //         : '' }
    //       {/* button to delete post */}

    //       {/* create comment */}
    //       <div className='divider' />
    //       <Link to={`/comments/${id}`} class='btn btn-secondary'>
    //                       Make Comment
    //       </Link>
    //     </div>
    //   )
    // }
  }
}

export default withRouter(ShowWorld)
