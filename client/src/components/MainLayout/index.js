import React, { Component } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import {Link} from "react-router-dom";
import '../PageLayout/PageLayout.css';
import Loading from '../Loading'
import Logo from './disco-ball.png'
import {connect} from 'react-redux'

const { Header, Sider, Content, Footer } = Layout;


class MainLayout extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  logout() {
    window.localStorage.removeItem("jwt");
  }

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          {this.state.collapsed ?
            <a href="/" className="logo" style={{justifyContent:'center'}} > <img src={Logo} alt="logo" className="l-img" /> </a>
            :
            <a href="/" className="logo"> <img src={Logo} alt="logo" className="logo-img l-img" /> <span style={{color:'#ffffffa6'}}>PartyManiacs</span> </a>}
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]}>
            <Menu.Item key="/dashboard/myParties" onClick={() => this.props.showPage('My Parties')} >
              <Icon type="star" />
              <span>My Parties</span>
              <Link to="/dashboard/myParties" ></Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/myWishlist" onClick={() => this.props.showPage('My Wishlist')} >
              <Icon type="gift" />
              <span>My Wishlist</span>
              <Link to="/dashboard/myWishlist" ></Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/myProfile" onClick={() => this.props.showPage('My Profile')} >
              <Icon type="user" />
              <span>My Profile</span>
              <Link to="/dashboard/myProfile" ></Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/invitedParties" onClick={() => this.props.showPage('Invited Parties')}>
              <Icon type="team" />
              <span>Invited Parties</span>
              <Link to="/dashboard/invitedParties" ></Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#fff',
            padding: 0
          }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <span style={{ fontSize: '25px' }}>{this.props.headerName}</span>
            <Button
              href="/auth/logout"
              onClick={this.logout}
              type="primary"
              style={{ marginRight: '25px' }}
            >Logout</Button>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            {this.props.children}
          </Content>
          <Footer></Footer>
        </Layout>
        {this.props.request && <Loading />}
      </Layout>
    );
  }
}

export default connect(
  (state) => ({ request: state.user.request })
)(MainLayout)
