import React from 'react';
import { Layout, Menu } from 'antd';
// import { Switch } from 'antd';
import {connect} from "react-redux";
import {
    withRouter
} from "react-router-dom";

import MenuIcons from '../Icons/MenuIcons';
import {refreshByJwt} from "../../Actions/jwtActions";
import {controlAboutsModalAction} from "../../Actions/modalsActions";
import AboutModal from "../AboutModal/AboutModal";

const { Sider } = Layout;
// const { SubMenu } = Menu;


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

                    <Menu.Item disabled key="m_favorited" icon={MenuIcons['star']} onClick={() => console.log("COMING SOON")}>
                        Favorites
                    </Menu.Item>

                    <Menu.Item
                        key="new"
                        icon={MenuIcons['nodeindex']}
                        onClick={() => {this.props.history.push({
                            pathname: `/new_story/`,});
                        }}
                    >New Story
                    </Menu.Item>

                    <Menu.Item key="m_about" icon={MenuIcons['info']} onClick={() => this.props.showAboutModalAction()}>
                        About
                    </Menu.Item>

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

                <AboutModal/>
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
        showAboutModalAction: () => {dispatch(controlAboutsModalAction(true))},

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));

