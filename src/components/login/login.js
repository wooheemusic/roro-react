import React from 'react'
import css from './login.scss'
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
      }, 5000)
    } else {
      this.setState({ isLoading: false })
    }

    // console.log(this.state)
  }

  render() {

    const { username, password, isSubmitted, isLoading } = this.state

    return (
      <div>
        {/* <h1>{this.props.me.name}</h1> */}
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label className="sr-only">Email address</label>
          <input
            value={username}
            name="username"
            type="text"
            onChange={this.onChange}
            className="form-control"
            placeholder="Email address"
          />
          {isSubmitted && !username &&
            <div className="help-block">Username is required</div>
          }

          <label className="sr-only">Password</label>
          <input
            value={password}
            name="password"
            type="password"
            onChange={this.onChange}
            className="form-control"
            placeholder="Password"
          />
          {isSubmitted && !username &&
            <div className="help-block">Username is required</div>
          }
          {/* <div className="checkbox mb-3">
            <label><input type="checkbox" value="remember-me" /> Remember me</label>
          </div> */}

          {!isLoading &&
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          }

          {isLoading &&
            <button className="btn btn-lg btn-primary btn-block" disabled type="submit">Loading</button>
          }
          <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
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