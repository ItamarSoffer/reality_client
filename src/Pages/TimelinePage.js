import React from 'react';
import {Layout} from "antd";
import Timeline from '../Components/Timelines/timeline';
import TimelineMenu from "../Components/TimelineMenu/TimelineMenu";
import SideMenuPage from './sideMenuPage'
import {connect} from "react-redux";
import {backendAPI} from "../Structure/api";
import axios from 'axios';
import LoadingPage from "../Components/LoadingComponent/LoadingPage";
import {NoPermissions} from "../Components/NoPermissions/noPermissions";
import {refreshByJwt} from "../Actions/jwtActions";

class StoryPage extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            isPageLoaded: false,
            role: null
        }

    }
    componentWillMount() {
        refreshByJwt(this.props.jwtToken);
        this.getBasicData();
        this.checkPermissions();
    }

    checkPermissions() {
        const permittedRoles = ['read', 'write', 'owner'];
        const url = this.props.match.params.timeline_url;
        const permissionsApi = backendAPI.concat(`/timeline/${url}/check_permissions`);
         axios.post(permissionsApi, {
             jwt_token: this.props.jwtToken,
         })
        .then((response) => {

            if (permittedRoles.indexOf(response.data.role) !== -1) {
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
    getBasicData() {
        const TimelineUrl = this.props.match.params.timeline_url;
        const apiGetBasicData = backendAPI.concat(`/timeline/${TimelineUrl}/basic_data`);
        axios.post(apiGetBasicData,
            {
                jwt_token: this.props.jwtToken,
            })
            .then(res => res.data[0])
            .then((data) => {
                this.setState({
                    timelineBasicData:data})});
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
                            <div >
                                <TimelineMenu url={this.props.match.params.timeline_url}
                                              loggedUser={this.props.loggedUser}
                                              role={this.state.role}
                                              timelineId={this.state.timelineBasicData.id}
                                              />
                                              
                                <Timeline url={this.props.match.params.timeline_url}
                                          basicData={this.state.timelineBasicData}
                                          timelineRenderCount={this.props.timelineRenderCount}
                                />

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
      DarkMode: state.sitesReducer.DarkMode,
      timelineRenderCount : state.sitesReducer.timelineRenderCount,
      jwtToken: state.usersReducer.jwtToken,

  }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);

