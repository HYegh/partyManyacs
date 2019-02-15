import React, { Component } from 'react';
import Wishlist from '../Wishlist';
import Parties from '../Parties';
import InvitedParties from '../Parties/invitedParties';
import Profile from '../Profile/profile.js';
import CreateParty from '../Parties/CreateParty'
import queryString from "query-string";
import { Redirect } from 'react-router-dom';
import MainLayout from '../MainLayout'
import { Route , Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../store/actions/UserActions'
import { fetchWishes } from '../../store/actions/wishActions'
import { fetchParties, removeCurrentParty } from '../../store/actions/partyActions'
import { fetchInvitedParties, removeInvCurrentParty } from '../../store/actions/invitedPartyActions'

import NotFound from './NotFound'

class PageLayout extends Component {
  state = {
    showWishlistPage: false,
    parties: null,
    headerName: "My Parties"
  };

  componentDidMount() {
    this.props.getUser()

    var query = queryString.parse(this.props.location.search);
    if (query.token) {

      window.localStorage.setItem("jwt", query.token);
      this.props.history.push("/dashboard/myParties");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.clientId !== this.props.clientId) {
      this.props.fetchWishes(this.props.clientId)
      this.props.fetchParties(this.props.clientId)
      this.props.fetchInvitedParties(this.props.email)
    }
  }

  showPage = (type) => {
    this.setState({ headerName: type })
    this.props.removeCurrentParty()
    this.props.removeInvCurrentParty()
  }

  render() {

    return (
      window.localStorage.getItem("jwt") ?
        <MainLayout
          showPage={this.showPage}
          headerName={this.state.headerName}
        >
        <Switch>
          <Route exact path='/dashboard/myParties' component={() => (
            <div>
              <Parties
                partyList={this.state.parties}
              />
              <CreateParty />
            </div>
          )
          } />
          <Route path='/dashboard/myWishlist' component={() => <Wishlist />} />
          <Route path='/dashboard/myProfile' component={() => <Profile />} />
          <Route path='/dashboard/invitedParties' component={() => <InvitedParties />} />
          <Route path='*' component={NotFound} />
        </Switch>

        </MainLayout> :
        <Redirect to='../' />
    );
  }
}

export default connect(
  (state) => ({
    clientId: state.user.clientId,
    email: state.user.email,
    fullName: state.user.fullName,
    gender: state.user.gender,
    phoneNumber: state.user.phoneNumber,
    image: state.user.image,
  }),
  { 
    getUser, 
    fetchWishes, 
    fetchParties, 
    fetchInvitedParties,
    removeCurrentParty,
    removeInvCurrentParty
  }
)(PageLayout)




