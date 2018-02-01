import React from 'react'
import './login.scss'
import Validator from 'react-validation';
// import { Link } from 'react-router-dom'

const Login = () => (
  <div>
    <form className="form-signin">
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label className="sr-only">Email address</label>
      <input type="email" id="inputEmail" className="form-control" placeholder="Email address" />
      <label className="sr-only">Password</label>
      <input type="password" id="inputPassword" className="form-control" placeholder="Password" />
      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
          </label>
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
    </form>
  </div>
)


export default Login;