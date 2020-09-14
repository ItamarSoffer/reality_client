import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {logoutAction} from "../Actions/usersActions";
import SideMenu from '../Components/SideMenu/SideMenu';



class SideMenuPage extends React.Component{

    handlerLogout = () => {
        this.props.logout();
        // console.log("Logged Out");
        this.props.history.push('/login');
    };


    render() {

        return (
            <SideMenu url={this.props.url}
                      darkMode={this.props.darkMode}
                      handlerLogout={this.handlerLogout}
                      jwtToken={this.props.jwtToken}
                      favorites={this.props.favorites}

            />
        )
    }
}



const mapStateToProps = state => {
    return {
        darkMode: state.sitesReducer.darkMode,
        jwtToken: state.usersReducer.jwtToken,
        favorites: state.favoritesReducer.favorites

    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logoutAction());
        },

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenuPage));