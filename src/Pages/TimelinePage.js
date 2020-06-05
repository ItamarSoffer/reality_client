import React from 'react';
import {Layout, Typography} from "antd";
import Timeline from '../Components/Timelines/timeline';
import TimelineMenu from "../Components/TimelineMenu/TimelineMenu";
import SideMenuPage from './sideMenuPage'
import {connect} from "react-redux";
import {backendAPI} from "../Structure/api";
import axios from 'axios';
import LoadingPage from "../Components/LoadingComponent/LoadingPage";
import {NoPermissions} from "../Components/NoPermissions/noPermissions";

const {Title} = Typography;

class RealityPage extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            isPageLoaded: false,
            role: null
        }
    }
    componentWillMount() {
        const url = this.props.match.params.timeline_url;
        const username = this.props.loggedUser;
        const permissionsApi = backendAPI.concat(`/timeline/${url}/permissions?username=${username}`);
         axios.get(permissionsApi)
        .then((response) => {

            if (typeof response.data.role !== 'undefined') {
                this.setState( {
                    isPageLoaded: true,
                role: response.data.role
            })}
            else {
               this.setState( {
                    isPageLoaded: true,

            })
            }
        })
    }




    render() {
        if (!this.state.isPageLoaded) {
            // if Not Loaded:

            return <LoadingPage/>;
        } else {
            return (

                <Layout
                    style={{minHeight: '100vh'}}
                >
                    <SideMenuPage url={this.props.match.params.timeline_url}/>
                    <Layout>

                        {!this.state.role ?

                            <NoPermissions />

                            :
                            <div>
                                <TimelineMenu url={this.props.match.params.timeline_url} DarkMode={this.props.DarkMode}
                                              loggedUser={this.props.loggedUser}/>
                                <Timeline url={this.props.match.params.timeline_url}/>
                            </div>
                        }
                    </Layout>
                </Layout>
            )
        }
    }

}


const mapStateToProps = state => {
  return {
    loggedUser: state.usersReducer.loggedUser,
      DarkMode: state.sitesReducer.DarkMode,

  }
};

const mapDispatchToProps = disaptch => {

};

export default connect(mapStateToProps, mapDispatchToProps)(RealityPage);

