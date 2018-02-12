import React, { Component } from 'react'
import './login.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as authActions from '../../core/store/modules/auth';
import * as T from 'react-translated'

class Login extends Component {

  state = {
    username: '',
    password: '',
    isSubmitted: false,
    isLoading: false
  }

  constructor(props) {
    super(props)
    // console.log(props)

    props.Auth.logout()

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onSubmit(e) {

    e.preventDefault()

    this.setState({
      isSubmitted: true,
      isLoading: true
    })
    const { username, password } = this.state
    if (username && password) {
      this.props.Auth.login({
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
        <div className="text-center">
          <h1><T.Translate text='Beetle' /></h1>
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

export default connect(
  (state) => ({
    me: state.auth.me,
    isLogin: state.auth.isLogin
  }),
  (dispatch) => ({
    Auth: bindActionCreators(authActions, dispatch)
  })
)(Login);