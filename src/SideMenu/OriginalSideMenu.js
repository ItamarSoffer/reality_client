import React from 'react';
import { Layout, Menu, Switch } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import MenuIcons from '../Icons/MenuIcons';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



class SideMenu extends React.Component {
  state = {
    collapsed: false,
    theme: 'dark',
    menuBackground: 'rgb(0,21,41)'

  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
      menuBackground: value ? 'rgb(0,21,41)' : 'rgb(255,255,255)'
    });
  };


  render() {
    return (
        <Sider collapsible
               collapsed={this.state.collapsed}
               onCollapse={this.onCollapse}
               style={{background: this.state.menuBackground,
      }}
        >
          <div className="logo" />
          <Menu
              theme={this.state.theme}
              mode="inline"
              defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1" icon={<PieChartOutlined/>}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />} />
          </Menu>
            <br/>
            <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        </Sider>


    );
  }
}

export default SideMenu;