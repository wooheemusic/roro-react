import React from 'react'
import Login from '../components/login'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as langAction from '../core/store/modules/lang';

class Home extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
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
    console.log(props)

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