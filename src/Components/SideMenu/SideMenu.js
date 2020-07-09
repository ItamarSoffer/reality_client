import React from 'react';
import { Layout, Menu, Switch } from 'antd';
import {
    withRouter
} from "react-router-dom";

import MenuIcons from '../Icons/MenuIcons';
import {refreshByJwt} from "../../Actions/jwtActions";

const { Sider } = Layout;

class SideMenu extends React.Component {
    constructor(props){
        super(props);
        const darkCheck = (this.props.darkMode === "true") || (this.props.darkMode === true)  ;
        this.state = {
            collapsed: true,
            theme: darkCheck ? 'dark' : 'light',
            menuBackground: darkCheck ? 'rgb(0,21,41)' : 'rgb(255,255,255)'
        };
    }

    onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  changeTheme = value => {

      this.props.handleChangeTheme(!value);
    this.setState({
      theme: value ? 'dark' : 'light',
      menuBackground: value ? 'rgb(0,21,41)' : 'rgb(255,255,255)'
    });
  };
  handleLogout = () => {
      this.props.handlerLogout();

  };


  render() {
    return (

        <Sider selectable={false}
            collapsible
               collapsed={this.state.collapsed}
               onCollapse={this.onCollapse}
               style={{background: this.state.menuBackground,}}
        >
          <div className="logo" />
          <Menu
              theme={this.state.theme}
              mode="inline"
              defaultSelectedKeys={['1']}
              selectable={false}
          >

            <Menu.Item key="Home" icon={MenuIcons['home']}
                            onClick={() => {
                                this.props.history.push(
                                    {pathname: `/`,}
                                    );
                                refreshByJwt(this.props.jwtToken);
                            }
                            }>
              Home
            </Menu.Item>

            <Menu.Item key="s4" icon={MenuIcons['appstore']}
                            onClick={() => {
                                this.props.history.push(
                                    {pathname: `/all/`,});
                                refreshByJwt(this.props.jwtToken);
                            }
                            }>
                All cards
            </Menu.Item>

            <Menu.Item
                key="new"
                icon={MenuIcons['nodeindex']}
                onClick={() => {this.props.history.push({
            pathname: `/new_timeline/`,});
      }}
            >New Timeline
            </Menu.Item>

            <Menu.Item disabled={true} key="my_timelines" icon={MenuIcons['user']}
            >
              My Timelines- Coming!
            </Menu.Item>



      {/*        {this.props.url ?*/}
      {/*            <SubMenu key="export" icon={MenuIcons['download']} title="Export">*/}
      {/*        <Menu.Item key="excel" icon={MenuIcons['excel']} onClick={() => DownloadExcel(this.props.url)}>*/}
      {/*                Excel*/}
      {/*      </Menu.Item>*/}
      {/*      </SubMenu>*/}
      {/*  : null*/}
      {/*}*/}
      <Menu.Item key="logout" icon={MenuIcons['logout']} onClick={this.handleLogout}>
              Logout
            </Menu.Item>

          </Menu>
            <br/>
            <br/>
            <Switch
                id={"theme_switch"}
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