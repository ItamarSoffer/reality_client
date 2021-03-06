import React from 'react';
import {Layout, Menu, message} from 'antd';
// import { Switch } from 'antd';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import MenuIcons from '../Icons/MenuIcons';
import {refreshByJwt} from "../../Actions/jwtActions";
import {controlAboutSiderAction} from "../../Actions/modalsActions";
import AboutSider from "../AboutSider/AboutSider";
import {clearFavorites, setReRenderFavorites, setUserFavorites} from "../../Actions/favoritesActions";
import {apiGetFavorites,} from "../../Actions/apiActions";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import {MenuShortcuts} from "../Shortcuts/MenuShortcuts";
import ShortcutsModal from "../Shortcuts/ShortcutsModal";

const { Sider } = Layout;
const { SubMenu } = Menu;


class SideMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
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
                   style={{ overflow: 'auto',
                       height: '100vh',
                       position: 'sticky',
                       top: 0,
                       left: 0,
                       background: this.props.darkMode? null: 'white',
                   }}


            >
                <div className="logo" />
                <Menu
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

                    <Menu.Item key="m_about" icon={MenuIcons['info']} onClick={() => this.props.showAboutSiderAction()}>
                        About
                    </Menu.Item>

                    <Menu.Item key="logout" icon={MenuIcons['logout']} onClick={this.handleLogout}>
                        Logout
                    </Menu.Item>

                </Menu>
                <br/>
                <br/>

                {/* DARK MODE SWITCH*/}
                <div style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', width: '100%'}}>
                    <ThemeSwitch/>
                </div>
                <AboutSider/>
                <ShortcutsModal/>
                <MenuShortcuts/>
            </Sider>


        );
    }
}
const mapStateToProps = state => {
    return {
        favoritesRerender: state.favoritesReducer.favoritesRerender,
        darkMode: state.sitesReducer.darkMode
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

