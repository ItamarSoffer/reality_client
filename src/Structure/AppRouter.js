import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SideMenuDemo from "../Components/SideMenu/OriginalSideMenu";
import BaseTimeline from "../Components/Timelines/base_timeline";
import RealityPage from "../Pages/TimelinePage";
import CardsPage from "../Pages/CardsPage";
import CreateNewEvent from "../Components/NewEvent/NewEventComponent";
import NewTimelinePage from "../Pages/NewTimelinePage";
import HomePage from "../Pages/HomePage";


class AppRouter extends React.Component{

    render() {
        return(
             <Router>

			  <div>

				  <Switch>
                      {
                          !this.props.isLogged ?

                              <div>


                                  <Route path="/login" component={LoginPage}/>
                                  <Route path="/" component={LoginPage}/>
                              </div> :
                              <div>

                                  < Route path="/side_menu" component={SideMenuDemo}/>

                                  <Route path="/base_timeline" component={BaseTimeline}/>

                                  <Route path="/timeline/:timeline_url" component={RealityPage}/>

                                  <Route path="/all" component={CardsPage}/>

                                  <Route path="/new_event" component={CreateNewEvent}/>

                                  <Route path="/new_story" component={NewTimelinePage}/>

                                  {/*<Route path="/login" component={LoginPage}/>*/}
                                  <Route path="/login" component={LoginPage}/>

                                  {/*<Route exact={true} path="/home" component={HomePage}/>*/}
                                  {/*<Route exact={true} path="/" component={HomePage}/>*/}

                                  <Route exact={true} path="/home" component={CardsPage}/>
                                  <Route exact={true} path="/" component={CardsPage}/>
                              </div>

                      }


				  </Switch>

			  </div>
		  </Router>
        )
    }
}

export default AppRouter