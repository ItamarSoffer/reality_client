import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";

import {logoutAction} from "../Actions/usersActions";
import {changeThemeAction} from '../Actions/siteActions';
import SideMenu from '../Components/SideMenu/SideMenu';


class SideMenuPage extends React.Component{

    handlerLogout = () => {
        this.props.logout();
        console.log("Logged Out");
        this.props.history.push('/login');
    };

    handleChangeTheme = (isDark) => {
        this.props.changeTheme(isDark)

    };

    render() {
        console.log("side menu props", this.props);
        return (
            <SideMenu url={this.props.url}
                      darkMode={this.DarkMode}
                      handlerLogout={this.handlerLogout}
                      handleChangeTheme={this.handleChangeTheme}
            />
        )
    }


}



const mapStateToProps = state => {
    return {
        isLogged: state.usersReducer.isLogged,
        DarkMode: state.sitesReducer.DarkMode

    }
};

const mapDispatchToProps = disaptch => {
    return {
        logout: () => {
            disaptch(logoutAction());
        },
        changeTheme : (isDark) => {disaptch(changeThemeAction(isDark));}
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenuPage));