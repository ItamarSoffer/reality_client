import React from 'react';
import { connect } from 'react-redux';

import AppRouter from './Structure/AppRouter';



import './App.css';
import 'antd/dist/antd.css';
//import './login/adds_atnd.css'
import './main.css'


class App extends React.Component{

    componentDidMount() {
        document.title = "Story";
    }

    render() {
	  return (
	  	<AppRouter isLogged={this.props.isLogged}/>

	  );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.usersReducer.isLogged
  }
};

const mapDispatchToProps = disaptch => {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
