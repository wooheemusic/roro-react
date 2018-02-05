import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  // withRouter,
  Switch,
  Route
} from 'react-router-dom'
// import Layout from 'react-layout'

import env from './config/env'

import Home from './routes/home'
import Protected from './routes/protected'
import Nav from './components/nav'

console.log(env)

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <PrivateRoute path="/protected" component={Protected} /> */}
          </Switch>
        </div>
      </Router>
    )
  }
}

// const PrivateRoute = ({ component, ...rest }) => {
  // console.log(component, rest)
  // return (
    // <div>HI</div>
    // <Route {...rest} render={props => (
    //   fakeAuth.isAuthenticated ? (
    //     <Component {...props} />
    //   ) : (
    //       <Redirect to={{
    //         pathname: '/',
    //         state: { from: props.location }
    //       }} />
    //     )
    // )} />
  // )
// }

export default App