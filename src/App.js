/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import './App.scss'
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
// worlds
import CreateWorld from './components/world/CreateWorld'
import IndexAllWorlds from './components/world/IndexWorld'
import ShowWorld from './components/world/ShowWorld'
import UpdateWorld from './components/world/UpdateWorld'
// characters
import CreateCharacter from './components/character/CreateCharacter'
import IndexAllCharacters from './components/character/IndexCharacter'
import ShowCharacter from './components/character/ShowCharacter'
import UpdateCharacter from './components/character/UpdateCharacter'
import { ReactComponent as Fantasy } from '../src/components/Footer/fantasy.svg'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />

        {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}

        <Footer user={user} />
        <main className='container'>
          {/* User Routes */}
          <Route
            exact
            path='/'
            render={() => (
              <body>
                <p>
									Welcome to RPGenerator! a place for Game Masters to create
									their Characters and Worlds to be added to and stored!
                </p>{' '}
                <Fantasy height='400' width='400' />
              </body>
            )}
          />
          <Route
            path='/sign-up/'
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path='/sign-in/'
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/sign-out/'
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/change-pw/'
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          {/* World Routes */}
          <AuthenticatedRoute
            user={user}
            exact
            path='/worlds/'
            render={() => (
              <IndexAllWorlds msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/worlds/:id'
            render={() => <ShowWorld msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            path='/create-world/'
            render={() => <CreateWorld msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            path='/worlds/:id/edit'
            render={() => <UpdateWorld msgAlert={this.msgAlert} user={user} />}
          />
          {/* Character Routes */}
          <AuthenticatedRoute
            user={user}
            path='/create-character/'
            render={() => (
              <CreateCharacter msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/characters/'
            render={() => (
              <IndexAllCharacters msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/characters/:id'
            render={() => (
              <ShowCharacter msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/characters/:id/edit'
            render={() => (
              <UpdateCharacter msgAlert={this.msgAlert} user={user} />
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
