import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Icon, Modal, Input } from 'antd';
import 'antd/dist/antd.css';
import {deleteWish, updateWishName, updateWishImage} from '../../../store/actions/wishActions';

const { Meta } = Card;

class Wishes extends Component {
  state = { 
    selectedFile: null,
    visible: false,
    wishName: '', 
    wishId: '',
  }
  updateForm = React.createRef();
  inputFileRef = React.createRef(); 

  uploadClickHandler = (id) => {
    this.setState({wishId: id})
    setTimeout( () => this.inputFileRef.current.click());
    
  }

  fileChangedHandler = (event, id) => {

    const file = event.target.files[0];
    console.log(file)
    this.setState({ selectedFile: file });
    setTimeout(() => {
      if (this.state.selectedFile) {
        const formData = new FormData();
        formData.append(
          'image',
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        this.props.updateWishImage(this.props.clientId, formData, id)
      }
    })
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  
  deleteWishHandler = id => {
    this.props.deleteWish(this.props.clientId, id)
  }

  updateWishNameHandler = id => {
    this.handleOk();
    this.props.updateWishName(this.props.clientId, this.state.wishName, id)
  }

  setWishName = (e) => {
    this.setState({wishName: e.target.value});
  }

  setInitialWish = (name, id) => {
    this.setState({
      wishName: name,
      wishId: id
    })
  }

  render() {
    return (
      <div className="contWish">
        {this.props.data.map(item => {
          return (
            <Card
              style={{ width: 300 }}
              cover={
                <img 
                  alt="example" 
                  className="card-img"
                  src={item.imageURL} 
                />
              }
              actions={[
                <Icon 
                  type="upload" 
                  onClick={() => this.uploadClickHandler(item._id)}
                />, 
                <Icon 
                  type="edit"
                  onClick={() => {
                    this.setInitialWish(item.name, item._id);
                    this.showModal();
                  }} 
                />, 
                <Icon 
                  type="delete"
                  onClick={() => this.deleteWishHandler(item._id)} 
                />
              ]}
            >
              <Meta
                title={item.name}
              />
              
            </Card>
            
          )
        })}
        <input
          type="file"
          onChange={(e) => this.fileChangedHandler(e, this.state.wishId)}
          //id="gallery-image"
          style={{
            display: "none"
          }}
          ref={this.inputFileRef}
          accept=".jpg, .jpeg, .png"
        />
        <Modal
          title="Edit Wish Name"
          visible={this.state.visible}
          onOk={() => this.updateWishNameHandler(this.state.wishId)}
          onCancel={this.handleCancel}
        >
            <span>
              Wish Name&nbsp;
            </span>
            <Input
              value={this.state.wishName}
              onChange={this.setWishName}
            />
        </Modal>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    data: state.wishList.data,
    clientId: state.user.clientId 
  }),
  {deleteWish, updateWishName, updateWishImage}
)(Wishes)