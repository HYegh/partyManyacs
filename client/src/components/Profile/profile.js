import React, { Component } from 'react';
import { List, Card, Select, Modal, Button, Icon, Form, Input } from 'antd';
import './profile.css';
import { connect } from 'react-redux'
import { getUpProfImg, changeValue, getUpProfile } from '../../store/actions/UserActions';

import { relative } from 'path';


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      fullName: this.props.fullName,
      gender: this.props.gender,
      phoneNumber: this.props.phoneNumber,
      loading: false,
      visible: false,

    }
    this.updateForm = React.createRef();
    this.inputFileRef = React.createRef();
  }
  uploadClickHandler = () => {
    this.inputFileRef.current.click()
  }

  fileChangedHandler = event => {

    const file = event.target.files[0];
    console.log(file)
    this.setState({ selectedFile: file });
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.state.selectedFile) {
        const formData = new FormData();
        formData.append(
          'image',
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        this.props.getUpProfImg(this.props.clientId, formData)
      }
    })
  };
  changeVal = (value, type) => {
    this.setState({ [type]: value })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      const obj = {
        fullName: this.state.fullName,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender
      }
      this.props.getUpProfile(this.props.clientId, obj)
    }, 1000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { Meta } = Card;
    const { Option } = Select;
    const { visible, loading } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const data = [
      `Email : ${this.props.email}`,
      `Phone Number : ${this.props.phoneNumber ? this.props.phoneNumber : 'No number given'} `,
      `Gender  : ${this.props.gender ? this.props.gender : 'is not defined'} `
    ];
    return (
      <div>
        <div className="container" style={{display:'flex'}}>
          <Card
            className="profile-card card-img"
            style={{ width: 300, height: 400, position: relative }}
            cover={!this.props.loader ? <img src={this.props.image} alt="Profile Img" /> : <Icon type="loading" className="loading" />}
            actions={[
              <Icon type="camera" onClick={this.uploadClickHandler} theme="twoTone" style={{ fontSize: "25px" }} />,
              <Icon type="edit" onClick={this.showModal} theme="twoTone" style={{ fontSize: "25px" }} />
            ]}
          >
            <Meta
              title={this.props.fullName}
            />
          </Card>
          <List
            style = {{ marginLeft : '40px'}}  
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          >
          </List>
        </div>
        <div>
          <input
            type="file"
            onChange={this.fileChangedHandler}
            id="gallery-image"
            className="hidden"
            ref={this.inputFileRef}
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <Modal
          visible={visible}
          title="Edit profile"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Form.Item
            {...formItemLayout}
            label={(
              <span>
                Nickname&nbsp;
              </span>
            )}
          >
            <Input
              value={this.state.fullName}
              onChange={(e) => this.changeVal(e.target.value, "fullName")}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Phone Number"
          >
            <Input
              style={{ width: '100%' }}
              value={this.state.phoneNumber}
              onChange={(e) => this.changeVal(e.target.value, "phoneNumber")}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Gender"
          >
            <Select
              style={{ width: 100 }}
              value={this.state.gender}
              onChange={(e) => this.changeVal(e, "gender")} >
              <Option value="Male"> Male </Option>
              <Option value="Female"> Female </Option>
            </Select>
          </Form.Item>
        </Modal>

      </div>
    )
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
    loader: state.user.loader
  }),
  { getUpProfImg, changeValue, getUpProfile }
)(Profile)