import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {logoutAction} from "../Actions/usersActions";
import {changeThemeAction} from '../Actions/siteActions';
import SideMenu from '../Components/SideMenu/SideMenu';



class SideMenuPage extends React.Component{

    handlerLogout = () => {
        this.props.logout();
        // console.log("Logged Out");
        this.props.history.push('/login');
    };

    handleChangeTheme = (isDark) => {
        this.props.changeTheme(isDark)

    };

    render() {

        return (
            <SideMenu url={this.props.url}
                      darkMode={this.props.DarkMode}
                      handlerLogout={this.handlerLogout}
                      handleChangeTheme={this.handleChangeTheme}
                      jwtToken={this.props.jwtToken}
                      favorites={this.props.favorites}

            />
        )
    }
}



const mapStateToProps = state => {
    return {
        DarkMode: state.sitesReducer.DarkMode,
        jwtToken: state.usersReducer.jwtToken,
        favorites: state.favoritesReducer.favorites

    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logoutAction());
        },
        changeTheme : (isDark) => {dispatch(changeThemeAction(isDark));},

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenuPage));