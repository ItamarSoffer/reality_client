import React from 'react';
import { Layout, Menu, Switch } from 'antd';
import {
    withRouter
} from "react-router-dom";

import MenuIcons from '../Icons/MenuIcons';
<<<<<<< HEAD
=======
import {refreshByJwt} from "../../Actions/jwtActions";
import {controlAboutSiderAction} from "../../Actions/modalsActions";
import AboutSider from "../AboutSider/AboutSider";
import {setReRenderFavorites, setUserFavorites, clearFavorites} from "../../Actions/favoritesActions";
import {apiGetFavorites,} from "../../Actions/apiActions";
>>>>>>> 5b098b5... completely added favorites

const { Sider } = Layout;

class SideMenu extends React.Component {
<<<<<<< HEAD

  state = {
    collapsed: true,
    // theme: 'dark',
    // menuBackground: 'rgb(0,21,41)'
     theme: this.props.DarkMode === "true" ? 'dark' : 'light',
    menuBackground: 'rgb(255,255,255)'

  };


    onCollapse = collapsed => {
    console.log(collapsed);
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
      console.log("logged out")
  };

<<<<<<< HEAD
=======

>>>>>>> e914983... completed JWT authentication
  render() {
      console.log(this.props.history.location);
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

            <Menu.Item key="Home" icon={MenuIcons['home']}
<<<<<<< HEAD
                            onClick={() => {this.props.history.push({
            pathname: `/`,});
      }}>
=======
                            onClick={() => {
                                this.props.history.push(
                                    {pathname: `/`,}
                                    );
                                refreshByJwt(this.props.jwtToken);
                            }
                            }>
>>>>>>> e914983... completed JWT authentication
              Home
            </Menu.Item>

            <Menu.Item key="s4" icon={MenuIcons['appstore']}
<<<<<<< HEAD
                            onClick={() => {this.props.history.push({
            pathname: `/all/`,});
      }}>
=======
                            onClick={() => {
                                this.props.history.push(
                                    {pathname: `/all/`,});
                                refreshByJwt(this.props.jwtToken);
                            }
                            }>
<<<<<<< HEAD
>>>>>>> e914983... completed JWT authentication
                All cards
=======
                All Stories
>>>>>>> df262e5... add string and date filters
            </Menu.Item>

            <Menu.Item
                key="new"
                icon={MenuIcons['nodeindex']}
                onClick={() => {this.props.history.push({
            pathname: `/new_story/`,});
      }}
            >New Story

            </Menu.Item>
<<<<<<< HEAD
=======
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
>>>>>>> 8e9378c... add non exist page

            <Menu.Item disabled={true} key="my_timelines" icon={MenuIcons['user']}
=======
    constructor(props){
        super(props);
        const darkCheck = (this.props.darkMode === "true") || (this.props.darkMode === true)  ;
        this.state = {
            collapsed: true,
            theme: darkCheck ? 'dark' : 'light',
            menuBackground: darkCheck ? 'rgb(0,21,41)' : 'rgb(255,255,255)'
        };
    }
    fetchFavorites(){
        // console.log("FETCHING");
        apiGetFavorites(this.props.jwtToken)
            .then((response) => {
                    if (response.status === 201) {
                        message.warning(response.data)
                    } else if (response.status === 200) {
                        this.props.setFavorites(response.data);
                    }
                }
            )
    }

    componentWillMount() {
        if (this.props.favorites === '') {
            this.fetchFavorites();
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.favoritesRerender === true){
            this.fetchFavorites();
            this.props.afterRerenderFavorites();
        }
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
        this.props.clearFavorites();

    };


    render() {
        const localAddress = window.location.href.split('/')[0] +'//'+ window.location.href.split('/')[2];
        return (
            <Sider selectable={false}
                   collapsible
                   collapsed={this.state.collapsed}
                   onCollapse={this.onCollapse}
                   // style={{background: this.state.menuBackground,}}
                   style={{ overflow: 'auto',
                       height: '100vh',
                       position: 'sticky',
                       top: 0,
                       left: 0,
                       background: this.state.menuBackground,
                   }}


            >
<<<<<<< HEAD
              My Timelines- Coming!
            </Menu.Item>
<<<<<<< HEAD
=======
              </SubMenu>
                }
>>>>>>> 8e9378c... add non exist page
=======
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
                    {
                        !this.props.favorites.length > 0 ? null :

                            <SubMenu key="m_favorites" title="Favorites" icon={MenuIcons['star']}>
                                {this.props.favorites.map(
                                    function (favItem) {
                                        return (
                                            <Menu.Item
                                                value={`fav_${favItem.story_id}`}
                                                icon={MenuIcons['star_filled']}
                                                onClick={() => {
                                                    window.open(`${localAddress}/story/${favItem.url}`)
                                                }}
                                            >

                                                {favItem.name}
                                            </Menu.Item>)
                                    }
                                )}
                            </SubMenu>
                    }


                    <Menu.Item
                        key="new"
                        icon={MenuIcons['nodeindex']}
                        onClick={() => {this.props.history.push({
                            pathname: `/new_story/`,});
                        }}
                    >New Story
                    </Menu.Item>
>>>>>>> e7d9d64... change routes from /timeline to /story

                    <Menu.Item key="m_about" icon={MenuIcons['info']} onClick={() => this.props.showAboutSiderAction()}>
                        About
                    </Menu.Item>


              {this.props.url ?
                  <SubMenu key="export" icon={MenuIcons['download']} title="Export">
              <Menu.Item key="excel" icon={MenuIcons['excel']} onClick={() => DownloadExcel(this.props.url)}>
                      Excel
            </Menu.Item>
            </SubMenu>
        : null
      }
      <Menu.Item key="logout" icon={MenuIcons['logout']} onClick={this.handleLogout}>
              Logout- not
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

                <AboutSider/>
            </Sider>


    );
  }
}
<<<<<<< HEAD
=======
const mapStateToProps = state => {
    return {
        favoritesRerender: state.favoritesReducer.favoritesRerender
    }
};

const mapDispatchToProps = dispatch => {
    return{
        showAboutSiderAction: () => {dispatch(controlAboutSiderAction(true))},
        setFavorites: (jwtToken) => {dispatch(setUserFavorites(jwtToken))},
        afterRerenderFavorites: () => {dispatch(setReRenderFavorites(false))},
        clearFavorites: () => {dispatch(clearFavorites())},

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));
>>>>>>> 5b098b5... completely added favorites

export default withRouter(SideMenu);