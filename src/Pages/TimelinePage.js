import React from 'react';
import {Layout} from "antd";
import Timeline from '../Components/Timelines/timeline';
import TimelineMenu from "../Components/TimelineMenu/TimelineMenu";
import SideMenuPage from './sideMenuPage'
import {connect} from "react-redux";
<<<<<<< HEAD
=======
import {backendAPI} from "../Structure/api";
import axios from 'axios';
import LoadingPage from "../Components/LoadingComponent/LoadingPage";
import {NoPermissions} from "../Components/NoPermissions/noPermissions";
<<<<<<< HEAD
<<<<<<< HEAD
import {enableEditAction, disableEditAction} from "../Actions/siteActions";
>>>>>>> 31ed3bc... add edit mode option to timeline
=======
import {refreshByJwt} from "../Actions/jwtActions";
<<<<<<< HEAD
>>>>>>> e914983... completed JWT authentication
=======
import {NotExists} from "../Components/NotExists/notExists";
>>>>>>> 8e9378c... add non exist page

=======
>>>>>>> 79aa366... add permissions control

class RealityPage extends  React.Component {
<<<<<<< HEAD
    render() {
        return(
        <Layout
            style={{ minHeight: '100vh' }}
        >
                          <SideMenuPage url={this.props.match.params.timeline_url} />
                  <Layout>
                      <TimelineMenu url={this.props.match.params.timeline_url} DarkMode={this.props.DarkMode}
                      loggedUser={this.props.loggedUser}/>
                      <Timeline url={this.props.match.params.timeline_url} />
                  </Layout>
        </Layout>
        )
=======
    constructor(props){
        super(props);
        this.state = {
            isPageLoaded: false,
            role: null,
            pageExists: false

        }

    }
    componentWillMount() {
        refreshByJwt(this.props.jwtToken);
        const permittedRoles = ['read', 'write', 'owner'];
        const url = this.props.match.params.timeline_url;
<<<<<<< HEAD
        const username = this.props.loggedUser;
        const permissionsApi = backendAPI.concat(`/timeline/${url}/check_permissions?username=${username}`);
         axios.get(permissionsApi)
=======
        const permissionsApi = backendAPI.concat(`/timeline/${url}/check_permissions`);
         axios.post(permissionsApi, {
             jwt_token: this.props.jwtToken,
         })
>>>>>>> e914983... completed JWT authentication
        .then((response) => {
            console.log(response.status);
            if (response.status === 204){
                console.log(204);
                this.setState({
                    pageExists: false,
                    isPageLoaded: true,

                })

            }
            else {
                this.setState({
                    pageExists: true,

                });

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
            }

        })
    }

    componentDidMount() {
        const TimelineUrl = this.props.match.params.timeline_url;
        const apiGetBasicData = backendAPI.concat(`/timeline/${TimelineUrl}/basic_data`);
        axios.get(apiGetBasicData)
            .then(res => res.data[0])
            .then((data) => {
                this.setState({
                    timelineBasicData:data})});

    }

    handleEnableEdit(){
        this.props.enableEdit()
    }

    handleDisableEdit(){
        this.props.disableEdit()
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
                        {this.state.pageExists? null :
                        <NotExists />
                        }

                        {this.state.pageExists  && (!this.state.role) ?

                            <NoPermissions />

<<<<<<< HEAD
                            :
                            <div>
=======
                            : null }
                        {this.state.pageExists && this.state.role?
                            <div >
>>>>>>> 8e9378c... add non exist page
                                <TimelineMenu url={this.props.match.params.timeline_url}
                                              loggedUser={this.props.loggedUser}
                                              role={this.state.role}
                                              />

                                <Timeline url={this.props.match.params.timeline_url}
                                basicData={this.state.timelineBasicData}
                                          timelineRenderCount={this.props.timelineRenderCount}
                                />
<<<<<<< HEAD
                            </div>
                        }
=======

                            </div> : null }
>>>>>>> 8e9378c... add non exist page
                    </Layout>
                </Layout>
            )
        }
>>>>>>> 31ed3bc... add edit mode option to timeline
    }

}


const mapStateToProps = state => {
  return {
<<<<<<< HEAD
<<<<<<< HEAD
    loggedUser: state.usersReducer.loggedUser,
      DarkMode: state.sitesReducer.DarkMode
=======
      loggedUser: state.usersReducer.loggedUser,
=======
>>>>>>> e914983... completed JWT authentication
      DarkMode: state.sitesReducer.DarkMode,
      timelineRenderCount : state.sitesReducer.timelineRenderCount
>>>>>>> da2bd71... add auto update after change (add or delete event)

  }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(RealityPage);

