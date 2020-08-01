import React from 'react';
import { Layout, Menu } from 'antd';
// import { Switch } from 'antd';
import {connect} from "react-redux";
import {
    withRouter
} from "react-router-dom";

import MenuIcons from '../Icons/MenuIcons';
import {refreshByJwt} from "../../Actions/jwtActions";
import {storyModePrevTableAction,
        storyModeTableAction,
        storyModeTimelineAction
} from "../../Actions/siteActions";
import {getQueryStringParams} from "../../Actions/queryStringActions";
import URLSearchParams from "url-search-params";

const { Sider } = Layout;
const { SubMenu } = Menu;


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

  handleTimelineMode = () => {
      this.props.storyModeTimelineAction();
      const pathName = this.props.history.location.pathname;
      let currentSearchQuery = getQueryStringParams(this.props.history.location.search);
      currentSearchQuery['view'] = 'timeline';
      this.props.history.push(
          {
              pathname: pathName,
              search: "?" + new URLSearchParams(
                  {...currentSearchQuery}
              ).toString()

          });
  };

  handleTableMode = () => {
      this.props.storyModeTableAction();
      const pathName = this.props.history.location.pathname;
      let currentSearchQuery = getQueryStringParams(this.props.history.location.search);
      currentSearchQuery['view'] = 'full_table';
      this.props.history.push(
          {
              pathname: pathName,
              search: "?" + new URLSearchParams(
                  {...currentSearchQuery}
              ).toString()

          });
  };
  handlePreviewTableMode = () => {
      this.props.storyModePrevTableAction();
      const pathName = this.props.history.location.pathname;
      let currentSearchQuery = getQueryStringParams(this.props.history.location.search);
      currentSearchQuery['view'] = 'preview_table';
      this.props.history.push(
          {
              pathname: pathName,
              search: "?" + new URLSearchParams(
                  {...currentSearchQuery}
              ).toString()

          });
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
                All Stories
            </Menu.Item>

            <Menu.Item
                key="new"
                icon={MenuIcons['nodeindex']}
                onClick={() => {this.props.history.push({
            pathname: `/new_story/`,});
      }}
            >New Story

            </Menu.Item>
                {!this.props.history.location.pathname.startsWith('/timeline/')? null :
              <SubMenu key="view" icon={MenuIcons['eye']} title="View Mode">

                  <Menu.Item
                      key="timeline_mode"
                      icon={MenuIcons['nodeindex']}
                      onClick={() => this.handleTimelineMode()}>
              Timeline
            </Menu.Item>
                  <Menu.Item
                      key="prev_table_mode"
                      icon={MenuIcons['compress']}
                      onClick={() => this.handlePreviewTableMode()}>
              Preview Table
            </Menu.Item>

            <Menu.Item
                key="table_mode"
                icon={MenuIcons['table']}
                onClick={() => this.handleTableMode()}>
              Full Table
            </Menu.Item>
              </SubMenu>
                }



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

        {/*    // DARK MODE SWITCH*/}
        {/*    <Switch*/}
        {/*        id={"theme_switch"}*/}
        {/*  checked={this.state.theme === 'dark'}*/}
        {/*  onChange={this.changeTheme}*/}
        {/*  checkedChildren="Dark"*/}
        {/*  unCheckedChildren="Light"*/}
        {/*/>*/}


        </Sider>


    );
  }
}
const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
    return{
        storyModeTimelineAction: () => {dispatch(storyModeTimelineAction())},
        storyModeTableAction: () => {dispatch(storyModeTableAction())},
        storyModePrevTableAction: () => {dispatch(storyModePrevTableAction())}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));

