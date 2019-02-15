import React, { Component } from 'react';
import { Tabs, Input, DatePicker, TimePicker, Button } from 'antd';
import moment from 'moment';
import {connect} from 'react-redux'
import {editingCurrentParty} from '../../store/actions/partyActions'
import PartyWishlist from './partyWishlist'
import PartyGuests from './partyGuests'
import MapContainer from '../Parties/CreateParty/MapContainer';
import Geocode from 'react-geocode';
import './viewParty.css'

const TabPane = Tabs.TabPane

class EditParty extends Component {
  state = {
    name: this.props.currentParty[0].name,
    date: this.props.currentParty[0].date,
    time: this.props.currentParty[0].time,
    location: this.props.currentParty[0].location,
    lat: this.props.currentParty[0].lat,
    lng: this.props.currentParty[0].lng,
  }

  setAddress = (e) => {
    this.setState({location: e.target.value})
  }

  setPartyName = (e) => {
    this.setState({name: e.target.value})
  }

  setPartyDate = (e) => {
    const date = moment(e._d).format("YYYY-MM-DD")
    this.setState({date: date})
  }

  setPartyTime = (e) => {
    const time = moment(e._d).format(e._f)
    this.setState({time: time})
  }

  updateParty = (id) => {
    this.props.editingCurrentParty({
      id: id,
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      location: this.state.location,
      lat: this.state.lat,
      lng: this.state.lng,
    }, this.props.clientId)
  }

  getCoordsFromAddress = (e) => {
    if (e.target.value) {
      Geocode.fromAddress(e.target.value).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({lat, lng})
        },
        error => {
          console.error(error);
        }
      )
    };
  }

  getAddressFromCoords = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    Geocode.fromLatLng(lat, lng)
      .then(res => this.setState({
        location: res.results[0].formatted_address
      })
    )
  }

  onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState({ lat, lng })
  }
  

  render(){
    const curParty = this.props.currentParty[0]
    return (
      <div className="container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Party" key="1">
            <div className="partyCont">
              <div> 
                <Input
                  type="text"
                  onChange={this.setPartyName} 
                  value={this.state.name} />    
              </div>
              <div> 
                <div>
                  <DatePicker
                    onChange={this.setPartyDate} 
                    name="date"
                    value={moment(new Date(this.state.date))} 
                  />   
                  <TimePicker
                    onChange={this.setPartyTime} 
                    name="time"
                    value={moment(this.state.time, 'HH:mm:ss')}
                  />
                </div>
              </div>
              <div >
                <MapContainer
                  initialCenter={{
                    lat: this.state.lat,
                    lng: this.state.lng
                  }}
                  center={{
                    lat: this.state.lat,
                    lng: this.state.lng
                  }}
                  addressValue={this.state.location}
                  onInputBlur={this.getCoordsFromAddress}
                  onChange={this.setAddress}
                  draggable={true}
                  onDragend={(t, map, coord) => {
                    this.onMarkerDragEnd(coord);
                    setTimeout(this.getAddressFromCoords(coord))
                  }}
                  position={{
                    lat: this.state.lat,
                    lng: this.state.lng
                  }}
                />
              </div>

              <Button
                style={{
                  marginTop: "10px"
                }} 
                type="primary" 
                onClick={() => this.updateParty(curParty._id)}>
                Save
              </Button>
            </div>
          </TabPane>
          <TabPane tab="Wishes" key="2">
            <PartyWishlist />
          </TabPane>
          <TabPane tab="Guests" key="3">
            <PartyGuests />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    currentParty: state.partyReducer.currentParty,
    clientId: state.user.clientId
  }),
  {editingCurrentParty}
)(EditParty)
