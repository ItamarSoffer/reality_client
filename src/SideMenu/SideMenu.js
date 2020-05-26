import React from 'react';
import { Layout, Menu, Switch } from 'antd';
import {
  Redirect,
    Link,
    withRouter
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

              <Menu.Item key="s4">
                <Link to="/New_Event"> New Event</Link>
              </Menu.Item>


            </SubMenu>

            <Menu.Item key="Home" icon={MenuIcons['piechart']}
                            onClick={() => {this.props.history.push({
            pathname: `/home/`,
        });
      }}>
              <Link to="/"> Home </Link>
            </Menu.Item>

            <Menu.Item key="s4" icon={MenuIcons['appstore']}
                            onClick={() => {this.props.history.push({
            pathname: `/all/`,
        });
      }}>
              <Link to="/all"> All cards</Link>
            </Menu.Item>

            <Menu.Item
                key="new"
                icon={MenuIcons['nodeindex']}
                onClick={() => {this.props.history.push({
            pathname: `/new_timeline/`,
        });
      }}
            >
              <Link to="/new_timeline"> New Timeline</Link>
            </Menu.Item>

            <Menu.Item key="my_timelines" icon={MenuIcons['piechart']}
            >
              My Timelines
            </Menu.Item>



              {this.props.url
        ? <Menu.Item key="Logout" icon={MenuIcons['deployment']}>
                      <Link to={this.props.url.concat("/add")}> Add Event</Link>
            </Menu.Item>
        : null
      }
      <Menu.Item key="addEvent" icon={MenuIcons['piechart']}>
              Logout- not
            </Menu.Item>

          </Menu>
            <br/>
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

export default withRouter(SideMenu);