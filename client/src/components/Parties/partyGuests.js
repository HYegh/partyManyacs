import React, { Fragment, Component } from 'react';
import { Card, Input, Button } from 'antd';
import axios from 'axios';
import {connect} from 'react-redux'
import {addingGuests, serchingUsers} from '../../store/actions/partyActions'
import '../Wishlist/wishlist.css'
import loading from '../../images/loading.gif'

const { Meta } = Card;

class PartyGuests extends Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      search: "",
      emails: []
    }
  }

  add = (id) => {
    this.props.addingGuests(id, this.state.emails)
    axios.post('/email/send', {
      emails: this.state.emails
    })

    this.setState({
      search: "",
      emails: []
    })
  }

  findUser = (val) => {
    this.setState({ search: val })
    this.props.serchingUsers(val.toLowerCase())
  }

  checkedUser = (checked, email) => {
    let users = this.state.emails;
    if(checked === true){
      users.push(email)
    }else{
      const index = users.indexOf(email)
      users.splice(index, 1)
    }
    this.setState({emails: users})
  }

  render(){
    return (
      <Fragment>
        <h1> Guests </h1> 
        <div className="saveCont" >
          <Input 
          style={{ flex: 1 }}
          type="text"
          value={this.state.search}
          onChange={(e) => this.findUser(e.target.value)} />
          <Button 
            type="primary" 
            icon="save"
            onClick={() => this.add(this.props.currentParty[0]['_id']) }
          >
            Save
          </Button>
          
        </div>
        {this.state.search !== "" &&
                <div className="searchCont">
                    {
                      this.props.searchedUsers[0] && this.props.searchedUsers.map((item) => {
                        return (
                          this.props.currentGuests.some(guest => guest[0].ClientId === item.ClientId) ?
                          <div key={item._id} className="guestsItem selectedItem">
                            <img src={item.image} alt="Guest" />
                            <span>{item.fullName}</span>
                          </div> :
                          <div key={item._id} className="guestsItem">
                            <input 
                              type="checkbox"
                              onClick={(e) => this.checkedUser(e.target.checked, item.email)} 
                               />
                            <img src={item.image} alt="Guest" />
                            <span>{item.fullName}</span>
                          </div>
                        )
                      })
                    }
                    {this.props.searchLoad && <div className="searchContLoad">
                                  <img src={loading} alt="loading" className="searchLoading" />
                                </div>}
                  </div>}
        <div>
          <div className="contWish">
          {
            this.props.currentGuests
            .filter(item => item.length !== 0)
            .map((item, index) => {
              return (
                <Card
                  key={index}
                  style={{ width: 226 }}
                  cover={
                      <img 
                        alt="example" 
                        className="card"
                        src={item[0].image} 
                      />
                    }
                  >
                  <Meta
                    title={item[0].fullName}
                  />
                   <Meta
                    title={item[0].email}
                    style={{ textDecoration: "underline" }}
                  />
              </Card>
              )
            })
          }
          </div>
        </div>
      </Fragment>
    )
  }
}

export default connect(
  (state) => ({
    currentParty: state.partyReducer.currentParty,
    currentGuests: state.partyReducer.currentGuests,
    searchedUsers: state.partyReducer.searchedUsers,
    searchLoad: state.partyReducer.searchLoad
  }),
  {addingGuests, serchingUsers}
)(PartyGuests)