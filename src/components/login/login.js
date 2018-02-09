import React from 'react'
import './login.scss'
import { connect } from 'react-redux'

import {
  login,
  logout
} from './../../core/actions/auth.action'

class Login extends React.Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.props.logout()

    this.state = {
      username: '',
      password: '',
      isSubmitted: false,
      isLoading: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
    // console.log(this.state)
  }

  onSubmit(e) {

    e.preventDefault()

    this.setState({
      isSubmitted: true,
      isLoading: true
    })
    const { username, password } = this.state
    if (username && password) {
      this.props.login({
        idx: 1,
        name: username,
        token: 'simple token'
      })

      setTimeout(() => {
        this.setState({ isLoading: false })
      }, 2000)
    } else {
      this.setState({ isLoading: false })
    }

  }

  render() {

    const { username, password, isSubmitted, isLoading } = this.state

    return (
      <div>
        {/* <h1>{this.props.me.name}</h1> */}
        <div className="text-center">
          <h1>Bettle</h1>
        </div>
        <form className="form-signin" onSubmit={this.onSubmit}>

          <div className="input-container">
            <input
              value={username}
              name="username"
              type="text"
              onChange={this.onChange}
              className="form-control"
              placeholder="Email address"
            />
            {isSubmitted && !username &&
              <div className="help-block text-danger"><small>Username is required</small></div>
            }
          </div>

          <div className="input-container">
            <label className="sr-only">Password</label>
            <input
              value={password}
              name="password"
              type="password"
              onChange={this.onChange}
              className="form-control"
              placeholder="Password"
            />
            {isSubmitted && !password &&
              <div className="help-block text-danger"><small>Username is required</small></div>
            }
            {/* <div className="checkbox mb-3">
            <label><input type="checkbox" value="remember-me" /> Remember me</label>
          </div> */}
          </div>

          {!isLoading &&
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          }

          {isLoading &&
            <button className="btn btn-lg btn-primary btn-block" disabled type="submit">Loading</button>
          }
        </form>

      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    me: state.me
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    login: (me) => dispatch(login(me)),
    logout: () => dispatch(logout())
  }
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login)
export default Login