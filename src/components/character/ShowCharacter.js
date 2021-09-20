import React, { Component } from 'react'
// add Link
import { withRouter, Link } from 'react-router-dom'
// API request
import { showCharacter, deleteCharacter } from '../../api/character'
// import { deleteComment } from '../../api/comment'
import Button from 'react-bootstrap/Button'
import Character from './CharacterComponent'
import {
  showCharacterFailure, showCharacterSuccess, deleteCharacterFailure, deleteCharacterSuccess
} from '../AutoDismissAlert/messages'
// import './character.scss'
// creates single show character with constructor, state
class ShowCharacter extends Component {
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

  // on initial page render
  componentDidMount () {
    // destructuring props for later use
    const { match, user, msgAlert } = this.props
    // show character API call
    showCharacter(match.params.id, user)

      // sets state of character
      .then((res) => {
        return this.setState({ character: res.data.character })
      })
      .then(() =>
        msgAlert({
          heading: 'Show Character success',
          message: showCharacterSuccess,
          variant: 'success'
        })
      )
      .catch(() =>
        msgAlert({
          heading: 'Show Character failed',
          message: showCharacterFailure,
          variant: 'danger'
        })
      )
  }

  handleDeleteCharacter = (event) => {
    const { match, user, msgAlert, history } = this.props
    deleteCharacter(match.params.id, user)
    // Redirect to the list of posts
      .then(() => history.push('/characters'))
      .then(() =>
        msgAlert({
          heading: 'Deleted Character successfully',
          message: deleteCharacterSuccess,
          variant: 'success'
        })
      )
      .catch(() =>
        msgAlert({
          heading: 'Delete Character failed',
          message: deleteCharacterFailure,
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
    // destructuring state of character for later use
    const { owner, game, name, level, race, discipline, background, description, abilities, items, backstory } = this.state.character
    // if no image show 'default image'
    // if (image === '') {
    return (
      <div>
        {/* bringing in the component character that is accepting passed down data as props */}
        <br />
        <Character
          owner={owner}
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
        />
        <br />
        {/* button to delete character */}
        { this.props.user.id === this.state.character.owner
          ? <Button
            onClick={this.handleDeleteCharacter}
            variant='danger'>
            Destroy Character
          </Button>
          : '' }
        {this.props.user.id === this.state.character.owner
          ? <Link
            to={`/characters/${this.state.character.id}/edit`}
            className='btn btn-outline-secondary'>
            Reshape Your Character
          </Link>
          : <p></p>}
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

export default withRouter(ShowCharacter)
