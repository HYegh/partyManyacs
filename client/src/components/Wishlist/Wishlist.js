import React, { Component } from 'react';
import { Input, Button } from 'antd';
import './wishlist.css'
import { connect } from 'react-redux'
import { addWish } from '../../store/actions/wishActions'
import Wishes from './Wishes'

class Wishlist extends Component {
  state = {
    value: ""
  }


  handleChange = value =>
    this.setState({ value })

  addingWish = () => {
    this.setState({ value: "" })
    this.props.addWish(this.props.clientId, this.state.value)
  }


  render() {
    return (
      <div className="container" >
        <div className="create-wish">
          <Input
            style={{
              width:550,
              maxWidth: "100%"
            }}
            addonAfter={
              <div>
              <Button
                icon="plus"
                type="primary"
                onClick={this.addingWish}
              >
                Add Wish
              </Button>
              </div>
            } 
            defaultValue="mysite"
            onPressEnter = {this.addingWish}
            value={this.state.value}
            onChange={e => this.handleChange(e.target.value)}
            placeholder="Add new Wish"
          />
        </div>
        <Wishes />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    clientId: state.user.clientId,
  }),
  { addWish }
)(Wishlist)