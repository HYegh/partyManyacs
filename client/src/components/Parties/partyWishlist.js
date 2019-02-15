import React, { Fragment, Component } from 'react';
import { Card, Button, Select } from 'antd';
import {connect} from 'react-redux'
import './CreateParty/CreateParty.css'
import {addingWishes, removeCurWish} from '../../store/actions/partyActions'
import '../Wishlist/wishlist.css'

const Option = Select.Option;

const { Meta } = Card;

class PartyWishlist extends Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      wishes: []
    }
  }

  
  addWishlist = (e) => {
    this.setState({wishes: e})
  }

  add = (id) => {
    this.props.addingWishes(id, this.state.wishes)
    this.setState({wishes: []})
  }

  removeWish = (wish_id, party_id) => {
    this.props.removeCurWish(wish_id, party_id)
  }

  render(){
    const children = [];
    this.props.data.forEach(item => {
      children.push(
        <Option key={item._id} value={item._id} >
          {item.name}
        </Option>)
    })
    return (
      <Fragment>
        <h1> Wishes </h1>
        <div className="saveCont" >
          <Select
            mode="multiple"
            style={{ flex: 1 }}
            value={this.state.wishes}
            placeholder="Add Wishlist"
            onChange={this.addWishlist}
          >
              {children}
          </Select>
          <Button 
            type="primary" 
            icon="save"
            onClick={() => this.add(this.props.currentParty[0]['_id'])}
          >
            Save
          </Button>
        </div>
        <div>
          <div className="contWish">
          { 
            this.props.currentWishes
            .filter(item => item[0])
            .sort((a, b) => a[0].name < b[0].name)
            .map((item) => {
              return (
                <Card
                    key={item[0]._id}
                    style={{ 
                      width: 226,
                      background: item[0].selected ? "#1890ff" : "#ffffff",
                     }}
                    cover={
                        <Fragment>
                          <img 
                            alt="example" 
                            className="card"
                            src={item[0].imageURL} 
                          />
                          {item[0].selected && <span class="checked">Checked !</span>}
                          {!item[0].selected && 
                          <span 
                            onClick={() => this.removeWish(item[0]._id, this.props.currentParty[0]['_id'])}
                            class="delete">
                            x
                          </span>}
                        </Fragment>
                      }
                    >
                    <Meta
                      title={item[0].name}
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
    data: state.wishList.data, 
    currentParty: state.partyReducer.currentParty,
    currentWishes: state.partyReducer.currentWishes
  }),
  {addingWishes, removeCurWish}
)(PartyWishlist)
