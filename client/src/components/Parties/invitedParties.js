import React, { Fragment, Component } from 'react';
import { Button } from 'antd';
// import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { connect } from 'react-redux'
import './CreateParty/CreateParty.css'
import {
  dispatchingInvCurrentParty,
  fetchInvPartiesWishes,
  removeInvCurrentParty,
  fetchInvPartiesInviter
} from '../../store/actions/invitedPartyActions'
import ViewParty from './viewParty'



class InvitedParties extends Component {

  editParty = (id, user_id) => {
    console.log({"party_id":id, "user_id": user_id})
    this.props.dispatchingInvCurrentParty(id)
    this.props.fetchInvPartiesWishes(id)
    this.props.fetchInvPartiesInviter(user_id)
  }

  removeInvCurrentParty = () => {
    this.props.removeInvCurrentParty()
  }

  render() {
    return (
      <Fragment>
        {this.props.invCurParty.length !== 0 &&
          <Button type="primary" onClick={() => this.removeInvCurrentParty()}>Back</Button>}
        {!this.props.invitedParties[0]
          ? <h3>You have no party yet!</h3>
          :
          <div>
            {this.props.invCurParty.length === 0 && <div class="party-list">
              {this.props.invitedParties
                .filter(item => item.length)
                .map((item, index) => (
                  <div className="party-item" key={item[0]._id} >
                    <div>
                      <span style={{ marginRight: '10px' }}>
                        {item[0].date}
                      </span>
                      <span style={{ marginLeft: '10px' }}>
                        {item[0].name}
                      </span>
                    </div>
                    <div>
                      <Button
                        onClick={() => this.editParty(item[0]._id, item[0].user_id)}
                        icon="eye"
                        theme="twoTone"
                        className="field-btn"
                        style={{ marginRight: "5px" }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>}
            {this.props.invCurParty.length !== 0 && <ViewParty />}
          </div>
        }
      </Fragment>
    )
  }
}


export default connect(
  (state) => ({
    invitedParties: state.invitedPartyReducer.invitedParties,
    invCurParty: state.invitedPartyReducer.invCurParty,
    clientId: state.user.clientId
  }),
  {
    dispatchingInvCurrentParty,
    fetchInvPartiesWishes,
    removeInvCurrentParty,
    fetchInvPartiesInviter
  }
)(InvitedParties)
