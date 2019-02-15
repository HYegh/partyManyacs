import React, { Component } from 'react';
import { List, Card } from 'antd';
import './inviter.css';
import { connect } from 'react-redux'
import { relative } from 'path';

class Inviter extends Component {
  render() {
    const { Meta } = Card;
    const inviterInvCurParty = this.props.inviterInvCurParty[0]
    const data = [
      `Email : ${inviterInvCurParty.email}`,
      `Phone Number : ${inviterInvCurParty.phoneNumber ? inviterInvCurParty.phoneNumber : 'No number given'} `,
      `Gender  : ${inviterInvCurParty.gender ? inviterInvCurParty.gender : 'is not defined'} `
    ];
    return (
      <div>
        <div className="container" style={{display:'flex'}}>
          <Card
            className="profile-card card-img"
            style={{ width: 350, height: 400, position: relative }}
            cover={<img src={inviterInvCurParty.image} alt="Inviter Img" />}
          >
            <Meta
              title={inviterInvCurParty.fullName}
            />
          </Card>
          <List
            style = {{ marginLeft : '40px'}}  
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          >
          </List>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    inviterInvCurParty: state.invitedPartyReducer.inviterInvCurParty
  })
)(Inviter)