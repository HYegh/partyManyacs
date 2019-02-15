import React, { Component } from 'react';
import moment from 'moment';
import { Modal, Input, DatePicker, TimePicker, Button } from 'antd';
import './CreateParty.css';
import MapContainer from './MapContainer';
import { connect } from 'react-redux'
import { addingParty } from '../../../store/actions/partyActions'
import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyABXOuxZCI3Rmrd5wEEFPEx_jDUGiCEJbw");

class CreateParty extends Component {
  state = {
    name: "",
    date: "",
    time: "",
    location: "",
    lat: 40.177200,
    lng: 44.503490,
    emails: [],
    visible: false
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
    }  
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

  setAddress = (e) => {
    this.setState({ location: e.target.value })
  }

  setPartyName = (e) => {
    this.setState({ name: e.target.value })
  }

  setPartyDate = (e) => {
    const date = moment(e._d).format("YYYY-MM-DD")
    this.setState({ date: date })
  }

  setPartyTime = (e) => {
    const time = moment(e._d).format(e._f)
    this.setState({ time: time })
  }



  addParty = () => {
    this.props.addingParty({
      ...this.state,
      user_id: this.props.clientId
    }, this.props.clientId)
    this.setState({
      name: "",
      date: "",
      time: "",
      location: "",
      lat: 40.177200,
      lng: 44.503490,
    })
  }

  //for modal 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.addParty();
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        {this.props.currentParty.length === 0 ?
          <Button type="primary" className="create-btn" onClick={this.showModal}>
            Create Party
          </Button> : null
        }

        <Modal
          title="Create Party"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            value={this.state.name}
            className="input"
            placeholder="Party Name"
            onChange={this.setPartyName}
          />
          <div style={{ marginBottom: "5px" }}>
            <DatePicker id="date"
              style={{ width: "270px" }}
              onChange={this.setPartyDate}
            />
            <TimePicker id="time"
              defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
              onChange={this.setPartyTime}
            />
          </div>
          <div style={{ height: '200px' }} >
            <div style={{ position: 'relative' }}>
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
                draggable={true}
                onChange={this.setAddress}
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
          </div>
          <div style={{height:'90px',width:'100%'}} />
        </Modal>
      </div>

    )
  }
}

export default connect(
  (state) => ({
    data: state.wishList.data,
    clientId: state.user.clientId,
    currentParty: state.partyReducer.currentParty,
    party: state.partyReducer.party
  }),
  { addingParty }
)(CreateParty)