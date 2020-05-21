import React from 'react';
import { Layout, Menu, Switch } from 'antd';
import {

    Link
} from "react-router-dom";

import MenuIcons from '../Icons/MenuIcons';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



class SideMenu extends React.Component {
  state = {
    collapsed: true,
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
        <Sider selectable={false}
            collapsible
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
              selectable={false}
          >
            <SubMenu key="sub1" icon={MenuIcons['user']} title="Development">
              <Menu.Item key="s1">
				<Link to="/base_timeline"> Base Timeline </Link>
              </Menu.Item>

              <Menu.Item key="s2">
                <Link to="/new_timeline"> Create New Timeline</Link>
              </Menu.Item>

              <Menu.Item key="s3">
                <Link to="/login"> Login Form</Link>
              </Menu.Item>

              <Menu.Item key="s4">
                <Link to="/all"> All cards</Link>
              </Menu.Item>

            </SubMenu>

            <Menu.Item key="Home" icon={MenuIcons['piechart']}>
              <Link to="/"> Home </Link>
            </Menu.Item>

              <Menu.Item key="s4" icon={MenuIcons['appstore']}>
                <Link to="/all"> All cards</Link>
              </Menu.Item>


            <Menu.Item key="my_timelines" icon={MenuIcons['piechart']}>
              My Timelines
            </Menu.Item>
            <Menu.Item key="Logout" icon={MenuIcons['piechart']}>
              Logout- not
            </Menu.Item>

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