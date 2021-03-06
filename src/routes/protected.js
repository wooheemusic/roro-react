import React from 'react'
import { connect } from 'react-redux'

let Protected = (props) => {

  console.log("Protected props :",  props)

  return (
    <div>
      <h1>Protected Page</h1>
      <h5>{props.me.name}</h5>
    </div>
  )
}

let mapStateToProps = (state) => {
  console.log("Protected connect :", state)
  return {
    me: state.auth.me,
    isLogin: state.auth.isLogin
  }
}

export default Protected = connect(mapStateToProps)(Protected)
