import React, { Fragment } from 'react'
import Card from 'react-bootstrap/Card'
// import Comment from './CommentForm'
// import '../post/post.scss'

// create show post format
// const styles = {
//   cardImage: {
//     objectFit: 'contain',
//     width: '50vw',
//     height: '30vh',
//     border: 'none'
//   }
// }

const Character = (props) => (
  <Fragment>
    <Card id='showCharacter-bg' style={{ width: '100%' }}>
      <Card.Body>
        <center>
          <h2 className='register'> {props.name}</h2>{' '}
        </center>
        {/* <h6>Creator</h6>
        <Card.Subtitle className='mb-2 text-muted'>
          {props.owner}
        </Card.Subtitle> */}
        <h4>Rule Set: {props.game}</h4>
        <h6>Level: {props.level}</h6>
        <h6>Race: {props.race}</h6>
        <h6>Class: {props.discipline}</h6>
        <h6>Background: {props.background}</h6>
        <h6>Abilities: {props.abilities}</h6>
        <h6>Items: {props.items}</h6>
        <h6>Description: </h6>
        <Card.Text>{props.description}</Card.Text>
        <h6>Backstory: </h6>
        <Card.Text>{props.backstory}</Card.Text>
        {/* <h6>Image</h6>
        <img src={props.image} style={styles.cardImage} alt='No image' /> */}
        {/* <Card.Text>
          {props.comments.map(({ id, text, image, id }) => (
            // passing props to comment form component
            <Comment
              key={id}
              text={text}
              image={image}
              id={id}
              postId={props.postId}
              // here we are carrying through onClick from Post to be handed down to Comment
              onClick={props.onClick}
              // onClickUpdate={props.onClickUpdate}
            />
          ))}
        </Card.Text> */}
      </Card.Body>
    </Card>
  </Fragment>
)

export default Character
