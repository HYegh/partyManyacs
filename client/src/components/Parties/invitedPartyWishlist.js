import React, { Fragment, Component } from 'react';
import { Card, Checkbox } from 'antd';
import {connect} from 'react-redux'
import './CreateParty/CreateParty.css'
import '../Wishlist/wishlist.css'
import { checkWish } from '../../store/actions/invitedPartyActions'



class InvitedPartyWishlist extends Component {
  
  toggleChecked = (id, checked, user_id) => {
    this.props.checkWish(id, checked, user_id, this.props.invCurParty[0]['_id'])
  }

  render(){
    return (
      <Fragment>
        <h1> Wishes </h1>
        <div>
          <div className="contWish">
          { 
            this.props.invCurPartyWishes
            .filter(item => item[0])
            .sort((a, b) => a[0].name > b[0].name)
            .map((item) => {
              return (
                 (item[0].selected && item[0].selectedUser === this.props.clientId) || !item[0].selected ?
                    <Card
                      key={item[0]._id}
                      style={{ 
                        width: 226,
                       }}
                      cover={
                          <Fragment>
                            <img 
                              alt="example" 
                              className="card"
                              src={item[0].imageURL} 
                            />
                          </Fragment>
                        }
                      >
                      <Checkbox 
                        style={{
                          width: "100%"
                        }}
                        checked={item[0].selected}
                        onClick={(e) => this.toggleChecked(item[0]._id, e.target.checked, this.props.clientId)}
                        >
                        {item[0].name}
                      </Checkbox>
                    </Card> :
                    <Card
                      key={item[0]._id}
                      style={{ 
                        width: 226,
                        background: "#1890ff",
                       }}
                      cover={
                          <Fragment>
                            <img 
                              alt="example" 
                              className="card"
                              src={item[0].imageURL} 
                            />
                            {item[0].selected && <span class="checked">Checked !</span>}
                          </Fragment>
                        }
                      >
                      {item[0].name}
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
    clientId: state.user.clientId,
    invCurPartyWishes: state.invitedPartyReducer.invCurPartyWishes,
    invCurParty: state.invitedPartyReducer.invCurParty 
  }),
  {checkWish}
)(InvitedPartyWishlist)
