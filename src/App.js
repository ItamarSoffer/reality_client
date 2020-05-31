import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { connect } from 'react-redux';

import AppRouter from './Structure/AppRouter';



import BaseTimeline from './Components/Timelines/base_timeline';
import SideMenuDemo from './Components/SideMenu/OriginalSideMenu';
import RealityPage from './Pages/TimelinePage';
import HomePage from './Pages/HomePage';
import CardsPage from './Pages/CardsPage';
import NewTimelinePage from './Pages/NewTimelinePage';

import LoginPage from './Pages/LoginPage';


import CreateNewEvent from "./Components/NewEvent/NewEventComponent"; // ??

import './App.css';
import 'antd/dist/antd.css';
import './login/adds_atnd.css'
import './main.css'


class App extends React.Component{
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
