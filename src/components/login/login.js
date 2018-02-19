import React, {
  Component
} from 'react'
import './login.scss'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux';
import * as authActions from '../../core/store/modules/auth';
import * as T from 'react-translated';
import bcryptjs from 'bcryptjs';
import axios from 'axios';

class Login extends Component {

  BASE_URL = 'http://13.124.130.41:8080/roro/';

  state = {
    username: 'woohee@osci.kr',
    // username: '',
    password: '1234',
    isSubmitted: false,
    isLoading: false,
    hasEmail: true
  }

  constructor(props) {
    super(props)
    console.log("Login contructor props :", props)

    props.Auth.logout()

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e) {
    const {
      name,
      value
    } = e.target;
    this.setState({
      [name]: value
    });
    // 존재유무 파악은 blur
    console.log("Login onchange this.state", this.state);
    console.dir("Login onchange e.target");
    console.dir(e.target);
  }

  onSubmit(e) {

    e.preventDefault()

    this.setState({
      isSubmitted: true,
      isLoading: true
    })

    console.log("Login onSubmit this.state :", this.state)
    console.log("Login onSubmit e.target :");
    console.dir(e.target);

    const {
      username,
      password
    } = this.state;

    const formData = {
      username: username,
      password: password
    };

    console.log("Login formData to send :", formData);
    this.saltedRequest(this.login.bind(this), formData, "password")


    if (username && password) {
      setTimeout(() => {
        console.log("state :", this.state);
        this.setState({
          isLoading: false
        })
        console.log("state :", this.state);
      }, 1000)
    } else {
      this.setState({
        isLoading: false
      })
    }

  }

  onBlur(e){
    console.log(e.target);
    this.exist(e.target.value);
  }

  exist(username){
    axios.get(this.BASE_URL + 'auth/exist?username=' + username)
    .then(x => this.handleExistReponse(x), x => this.handleExistReponse(x));
  }

  handleExistReponse(res) {
    switch (res.data.data.exist) {
      case true:
        this.setState({hasEmail : true});
        break;
      default:
        this.setState({hasEmail : false});
    }
  }


  saltedRequest(callback, data, hashTarget = "password") {
    bcryptjs.genSalt(3, function(err, salt) {
      bcryptjs.hash(data[hashTarget], salt, function(err, hash) {
        data[hashTarget] = hash;
        console.log("Login salted formData", data);
        callback(data);
      });
    });

  }

  login(data) {
    axios.post(
      this.BASE_URL + 'auth/login', data
    ).then((x) => {
        console.log("Login success :", x)
        this.handleLoginResponse(x);
      },

      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      function(e) {
        // 404 or 401, rest api not supported yet
        console.log("Login error :", e);
        this.handleLoginResponse(e);
      }).catch( e => console.log("i catch actual errors, not denial responses", e));
  }

  // response to the redux store
  handleLoginResponse(res) {
    switch (res.data.status) {
      case "success":
        let token = res.data.data.token;
        //sessionStorage.setItem("token", token);
        this.props.Auth.login({
          idx: 1, // what is idx??????
          name: this.state.username,
          token: token,
        })
        break;
      default:
      alert("login failed");
        //sessionStorage.removeItem("token");
        this.props.Auth.logout();
    }
  }

  render() {

    console.log("Lonin render props :", this.props);

    const {
      username,
      password,
      isSubmitted,
      isLoading,
      hasEmail
    } = this.state

    return ( <
      div >
      <
      div className = "text-center" >
      <
      h1 > < T.Translate text = 'Beetle' / > < /h1> < /
      div > <
      form className = "form-signin"
      onSubmit = {
        this.onSubmit
      } >

      <
      div className = "input-container" >
      <
      input value = {
        username
      }
      disabled = { isLoading }
      name = "username"
      type = "text"
      onChange = {
        this.onChange
      }
      onBlur = {
        this.onBlur
      }
      className = "form-control"
      placeholder = "Email address" /
      >
      {
        isSubmitted && !username &&
        <
        div className = "help-block text-danger" > < small > Username is required < /small></div >
      }
      {
        username && !hasEmail &&
        <
        div className = "help-block text-danger" > < small > Username does not exist. < /small></div >
      }


      <
      /div>

      <
      div className = "input-container" >
      <
      label className = "sr-only" > Password < /label> <
      input value = {
        password
      }
      disabled = { isLoading }
      name = "password"
      type = "password"
      onChange = {
        this.onChange
      }
      className = "form-control"
      placeholder = "Password" /
      >
      {
        isSubmitted && !password &&
        <
        div className = "help-block text-danger" > < small > Username is required < /small></div >
      } {
        /* <div className="checkbox mb-3">
                    <label><input type="checkbox" value="remember-me" /> Remember me</label>
                  </div> */
      } <
      /div>

      {
        !isLoading &&
          <
          button className = "btn btn-lg btn-primary btn-block"
        type = "submit" > Sign in < /button>
      }

      {
        isLoading &&
          <
          button className = "btn btn-lg btn-primary btn-block"
        disabled type = "submit" > Loading < /button>
      } <
      /form>

      <
      /div>
    )
  }
}

export default connect(
  (state) => {
    console.log("Login connect :", state)
    return {
    me: state.auth.me,
    isLogin: state.auth.isLogin
  }},
  (dispatch) => ({
    Auth: bindActionCreators(authActions, dispatch)
  })
)(Login);
