import React from 'react'
import Login from '../components/login'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as langAction from '../core/store/modules/lang';

class Home extends React.Component {

  constructor(props) {
    super();
    console.log("Home constructor", props);
  }

  render() {
    console.log("Home props :", this.props);
    console.log("redux-connected Login Module :", Login);
    return (
      <div>
        <Login />
        <LangChangeButton />
      </div >
    )
  }

}

class LangChangeButton extends React.Component {

  constructor(props) {
    super(props)
    console.log("LangChangeButton", props)

    this.onChangeLang = this.onChangeLang.bind(this)
  }

  onChangeLang(e) {
    this.props.Lang.changeLang(e.target.value)
  }

  render() {
    return (
      <div>
        <button value="en" onClick={this.onChangeLang}>EN</button>
        <button value="ko" onClick={this.onChangeLang}>KO</button>
      </div>
    )
  }

}

Home = connect(
  (state) => {
     console.log("Home connect", state);
    return {
      isLogin: state.auth.isLogin
    }
  }
)(Home);

const mapStateToProps = (state) => {
  return {
    lang: state.lang.lang
  }
}

LangChangeButton = connect(
  mapStateToProps,
  (dispatch) => ({
    Lang: bindActionCreators(langAction, dispatch)
  })
)(LangChangeButton)

export default Home
