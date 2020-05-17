import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import BaseTimeline from './Timelines/base_timeline';
import EventForm from './AddEvent/AddEvent';
import LoginForm from './login/login_form';
import SideMenuDemo from './SideMenu/OriginalSideMenu';
import RealityPage from './page/RealityPage';
import HomePage from './page/HomePage';
import CardsPage from './page/CardsPage';



import './App.css';
import 'antd/dist/antd.css';
import './login/adds_atnd.css'
import './main.css' // ??


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
		<Route path="/side_menu">
			<SideMenuDemo />
		</Route>

		<Route path="/timeline/:timeline_url"
		component={RealityPage}/>

		<Route path="/base_timeline">
			<BaseTimeline />
		</Route>

		<Route path="/all">
		<CardsPage />
		</Route>


		<Route path="/add">
		<EventForm />
		</Route>

		<Route path="/login">
		<LoginForm />
		</Route>

		<Route path= "/">
			<HomePage />
		</Route>

	</Switch>

	</div>
	</Router>
);

}

export default App;
