import React, { Component } from 'react'
import { connect } from "react-redux";
class confirmation extends Component {
  constructor(props){
    super(props)
    this.state={
      
    }
  }
  render() {
   const {user}= this.props.data;
    return (
      <>
      {user.lat ? <div>lat : {user.lat}</div> : ''}
      {user.lng ? <div>lng : {user.lng}</div> : ''}
      

      {user.routes ? <div>routes : {user.routes}</div> :''}
      {user.neighborhood ? <div>neighborhood : {user.neighborhood}</div> :''}

      {user.sublocality ? <div>sublocality : {user.sublocality}</div> :'' }
      {user.political ? <div>political : {user.political}</div>:''}

      {user.city ? <div>city : {user.city}</div>:''}
      {user.state ? <div>state : {user.state}</div>:''}

      {user.country?<div>country : {user.country}</div>:''}
      {user.postal_code?<div>postal_code : {user.postal_code}</div>:''}

      </>
      
    )
  }
}
const mapStateToProps = (state) => ({
  data: state.combine
})

export default connect(mapStateToProps,{ })(confirmation);
