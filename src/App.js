import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Timeline from './Timelines/timeline';
import BaseTimeline from './Timelines/base_timeline';
import Home from './HomePage/ReactHome';
import EventForm from './AddEvent/AddEvent';
import LoginForm from './login/login_form';
import './App.css';
import 'antd/dist/antd.css';
import './login/adds_atnd.css'
import './main.css' // ??


function App() {
  return (

	<Router>

	<div>
      {/*comment the nav to hide this*/}
		<nav>
		<ul>
			<li>
				<Link to="/"> Home </Link>
			</li>
			<li>
				<Link to="/base_timeline"> Base Timeline </Link>
			</li>
			<li>
				<Link to="/add"> Add new</Link>
			</li>
			<li>
				<Link to="/login"> Login Form</Link>
			</li>
		</ul>
		</nav>

	<Switch>

		<Route path="/timeline/:timeline_url"
		component={Timeline}/>



		<Route path="/base_timeline">
			<BaseTimeline />
		</Route>

		<Route path="/add">
		<EventForm />
		</Route>

		<Route path="/login">
		<LoginForm />
		</Route>

		<Route path= "/">
			<Home />
		</Route>

	</Switch>

	</div>
	</Router>
);

}

export default App;
