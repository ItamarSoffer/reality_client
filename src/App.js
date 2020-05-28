import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


import BaseTimeline from './Components/Timelines/base_timeline';
import LoginForm from './login/login_form';
import SideMenuDemo from './Components/SideMenu/OriginalSideMenu';
import RealityPage from './Pages/TimelinePage';
import HomePage from './Pages/HomePage';
import CardsPage from './Pages/CardsPage';
import NewTimelinePage from './Pages/NewTimelinePage';


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

		<Route path="/new_event">
		<CreateNewEvent />
		</Route>

		<Route path="/new_timeline">
		<NewTimelinePage/>
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
