import React from 'react';
import { connect } from 'react-redux';

import AppRouter from './Structure/AppRouter';



import './App.css';
import 'antd/dist/antd.css';
//import './login/adds_atnd.css'
import './main.css'
import {checkJwt} from "./Actions/jwtActions";


class App extends React.Component{
    componentDidMount() {
        document.title = "Story";
    }

    render() {
	  return (
	  	<AppRouter
            isLogged={checkJwt(this.props.jwtToken)}
        />

	  );
  }
}

const mapStateToProps = state => {
  return {
      jwtToken: state.usersReducer.jwtToken
  }
};

const mapDispatchToProps = disaptch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
