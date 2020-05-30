import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { connect } from 'react-redux';



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


function App() {
  return (

	<Router>

	<div>
      {/*comment the nav to hide this*/}
		{/*<nav>*/}
		{/*<ul>*/}
		{/*	<li>*/}
		{/*		<Link to="/"> Home </Link>*/}
		{/*	</li>*/}
		{/*	<li>*/}
		{/*		<Link to="/base_timeline"> Base Timeline </Link>*/}
		{/*	</li>*/}
		{/*	<li>*/}
		{/*		<Link to="/add"> Add new</Link>*/}
		{/*	</li>*/}
		{/*	<li>*/}
		{/*		<Link to="/login"> Login Form</Link>*/}
		{/*	</li>*/}
		{/*</ul>*/}
		{/*</nav>*/}

	<Switch>
		<Route path="/side_menu" component={SideMenuDemo}/>

		<Route path="/base_timeline" component= {BaseTimeline} />

		<Route path="/timeline/:timeline_url" component={RealityPage}/>

		<Route path="/all" component={CardsPage} />

		<Route path="/new_event" component={CreateNewEvent}/>

		<Route path="/new_timeline" component={NewTimelinePage}/>

		<Route path="/login" component={LoginPage}/>

		<Route path= "/" component={HomePage}/>

	</Switch>

	</div>
	</Router>
);

}

const mapStateToProps = state => {
  return {
    isLogged: state.usersReducer.isLogged
  }
};

const mapDispatchToProps = disaptch => {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
