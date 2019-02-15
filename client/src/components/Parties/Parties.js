import React, { Fragment, Component } from 'react';
import { Button } from 'antd';
// import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import {connect} from 'react-redux'
import './CreateParty/CreateParty.css'
import {dispatchingCurrentParty, 
        removeCurrentParty, 
        deletingCurrentParty,
        fetchPartiesWishes,
        fetchPartiesGuests
      } from '../../store/actions/partyActions'
import EditParty from './editParty'



class Parties extends Component {

  editParty = (id) => {
    console.log(id)
    this.props.dispatchingCurrentParty(id)
    this.props.fetchPartiesWishes(id)
    this.props.fetchPartiesGuests(id)
  }

  removeCurrentParty = () => {
    this.props.removeCurrentParty()
  }

  deleteParty = (id) => {
    this.props.deletingCurrentParty(id, this.props.clientId)
  }


  render(){
    return (
      <Fragment>
        {this.props.currentParty.length === 0 ?
          null :
          <Button type="primary" onClick={() => this.removeCurrentParty()}>Back</Button>}
        {!this.props.party.length
          ? <h3>You have no party yet!</h3>
          :
          <div >
            {this.props.currentParty.length === 0 && <div class="party-list">
              {this.props.party.map((item, index) => (
                <div className="party-item" key={item._id} >
                  <div>
                    <span style={{marginRight:'10px'}}>
                      {item.date}
                    </span>
                    <span style={{ marginLeft: '10px' }}>
                      {item.name}
                    </span>
                  </div>
                  <div>
                    <Button
                      onClick={() => this.editParty(item._id)}
                      className="field-btn"
                      icon="edit"
                      style={{ marginRight: "5px" }}
                    />
                    <Button
                      onClick={() => this.deleteParty(item._id)}
                      className="field-btn"
                      type="danger"
                      icon="delete"
                    />
                  </div>
                </div>
              ))}
            </div>}
            {this.props.currentParty.length !== 0 && <EditParty />}
          </div>
        }
      </Fragment>
    )
  }
}


export default connect(
  (state) => ({
    party: state.partyReducer.party,
    currentParty: state.partyReducer.currentParty,
    clientId: state.user.clientId
  }),
  {
    dispatchingCurrentParty, 
    removeCurrentParty, 
    deletingCurrentParty,
    fetchPartiesWishes,
    fetchPartiesGuests
  }
)(Parties)

