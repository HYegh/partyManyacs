import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Tabs } from 'antd';
//import './CreateParty/CreateParty.css'

import InvitedPartyWishlist from './invitedPartyWishlist'
import Inviter from '../Inviter'
import MapContainer from '../Parties/CreateParty/MapContainer';
import './viewParty.css'

const TabPane = Tabs.TabPane;


class ViewParty extends Component {
  state = {
    name: this.props.invCurParty[0].name,
    date: this.props.invCurParty[0].date,
    time: this.props.invCurParty[0].time,
    location: this.props.invCurParty[0].location,
    lat: this.props.invCurParty[0].lat,
    lng: this.props.invCurParty[0].lng,
  }

  render(){
    return (
      <div className="container">
      	<Tabs defaultActiveKey="1">
				  <TabPane tab="Party" key="1">
			    	<div className="partyCont" >
			        <div className="info"> 
		            <label>Party Name:</label>
		            <span>{this.state.name}</span>
		          </div>
		          <div>
		            <label>Date:</label>
		            <span>{this.state.date}</span> 
		          </div>
		          <div> 
		            <label>Time:</label>
		            <span>{this.state.time}</span>
		          </div>
		          <div>
		            <label>Location:</label>
		            <span>{this.state.location}</span> 
		          </div>
		          <MapContainer
		            initialCenter={{
		              lat: this.state.lat,
		              lng: this.state.lng
		            }}
		            draggable={false}
		            inputStyle={{display: "none"}}
		           />
			       </div>
			    </TabPane>
			    <TabPane tab="Inviter" key="2">
			    	<Inviter />
			    </TabPane>
			    <TabPane tab="Wishes" key="3">
			    	 <InvitedPartyWishlist />
			    </TabPane>
				</Tabs>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    invCurParty: state.invitedPartyReducer.invCurParty,
    clientId: state.user.clientId
  })
)(ViewParty)
