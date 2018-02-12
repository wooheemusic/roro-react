import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  // withRouter,
  Switch,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
// import * as _ from 'lodash'

import { Provider as TransProvider } from 'react-translated'
import translation from './locales'
// TransModules

// import env from './core/config/env'

import Home from './routes/home'
import Protected from './routes/protected'
import Nav from './components/layout/nav'

class App extends React.Component {

  state = {
    lang: navigator.language
  }

  render() {
    // console.log(this.props)
    return (
      <Router>
        <TransProvider language={this.state.lang} translation={translation}>
          {/*<h1>{this.props.me}</h1>*/}
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute path="/protected" component={Protected} />
            <Route component={noMatch} />
          </Switch>
        </TransProvider>
      </Router>
    )
  }
}

const noMatch = () => (
  <div>
    <h3>404 ERROR !!</h3>
  </div>
)

let AuthRoute = ({ component: Component, ...rest }) => {
  console.log(rest)
  // return (
  //   <div>Hi</div>
  // )
  return (

    <Route {...rest} render={props => (
      rest.isLogin ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: '/',
            state: {
              from: props.location,
              isLogin: props.isLogin
            }
          }} />
        )
    )} />

  )
}

let mapStateToProps_AuthRoute = (state) => {
  // console.log(state)
  return {
    isLogin: state.auth.isLogin
  }
}

let mapStateToProps = (state) => {
  // console.log(state)
  return {
    lang: state.lang.lang
  }
}

AuthRoute = connect(mapStateToProps_AuthRoute)(AuthRoute)
App = connect(mapStateToProps)(App)
export default App