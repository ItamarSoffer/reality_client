import React from 'react';
import {connect} from "react-redux";

import {withRouter} from "react-router";

import {logoutAction} from "../Actions/usersActions";
import SideMenu from '../Components/SideMenu/SideMenu';
class SideMenuPage extends React.Component{

    handlerLogout = () => {
        this.props.logout();
        console.log("Logged Out");
        this.props.history.push('/login');
    };

    render() {
        return (
            <SideMenu url={this.props.url} handlerLogout={this.handlerLogout} />
        )
    }


}



const mapStateToProps = state => {
    return {
        isLogged: state.usersReducer.isLogged
    }
};

const mapDispatchToProps = disaptch => {
    return {
        logout: () => {
            disaptch(logoutAction());
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenuPage));