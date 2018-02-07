import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  // withRouter,
  Switch,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'

// import env from './core/config/env'

import Home from './routes/home'
import Protected from './routes/protected'
import Nav from './components/layout/nav'

class App extends React.Component {

  // constructor(props) {
  //   super(props)

  //   console.log(props)
  // }

  render() {
    return (
      <Router>
        <div>
          {/* <h1>{this.props.me.name}</h1> */}
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute path="/protected" component={Protected} />
            <Route component={noMatch} />
          </Switch>
        </div>
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

let mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  }
}

AuthRoute = connect(mapStateToProps)(AuthRoute)

export default App