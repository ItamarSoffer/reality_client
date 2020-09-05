import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import StoryPage from "../Pages/TimelinePage";
import CardsPage from "../Pages/CardsPage";
import NewTimelinePage from "../Pages/NewTimelinePage";
import HomePage from "../Pages/HomePage";
import {NotExists} from "../Components/NotExists/notExists";


class AppRouter extends React.Component{

    render() {
        return(
            <Router>

                <div>

                    <Switch>
                        {
                            !this.props.isLogged ?

                                <div>
                                    <Route path="/" component={LoginPage}/>
                                </div> :
                                <div>

                                    <Route path="/story/:timeline_url" component={StoryPage}/>

                                    <Route path="/all" component={CardsPage}/>

                                    <Route path="/new_story" component={NewTimelinePage}/>

                                    <Route path="/login" component={LoginPage}/>

                                    <Route exact={true} path="/home" component={HomePage}/>
                                    <Route exact={true} path="/" component={HomePage}/>

                                </div>

                        }


                    </Switch>

                </div>
            </Router>
        )
    }
}

export default AppRouter