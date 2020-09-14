import React from 'react';
import {Layout} from "antd";
import Timeline from '../Components/Timelines/timeline';
import TimelineMenu from "../Components/TimelineMenu/TimelineMenu";
import SideMenuPage from './sideMenuPage'
import {connect} from "react-redux";
import LoadingPage from "../Components/LoadingComponent/LoadingPage";
import {NoPermissions} from "../Components/NoPermissions/noPermissions";
import {refreshByJwt} from "../Actions/jwtActions";
import {NotExists} from "../Components/NotExists/notExists";
import {apiCheckPermission, apiGetBasicData} from "../Actions/apiActions";

class StoryPage extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            isPageLoaded: false,
            basicDataLoaded: false,
            role: null,
            pageExists: false

        }

    }
    componentWillMount() {
        refreshByJwt(this.props.jwtToken);
        this.getBasicData();
        this.checkPermissions();
    }

    checkPermissions() {
        const permittedRoles = ['read', 'write', 'owner', 'creator'];
        const url = this.props.match.params.timeline_url;
        apiCheckPermission(this.props.jwtToken, url)
            .then((response) => {
                if (response.status === 204){
                    // console.log(204);
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
    getBasicData() {
        const storyUrl = this.props.match.params.timeline_url;
        apiGetBasicData(this.props.jwtToken, storyUrl)
            .then((data) => {
                this.setState({
                    timelineBasicData:data,
                    basicDataLoaded: true})});
    }

    render() {
        if (!( this.state.isPageLoaded && this.state.basicDataLoaded)) {
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

                            : null }
                        {this.state.pageExists && this.state.role?
                            <div >
                                <TimelineMenu url={this.props.match.params.timeline_url}
                                              loggedUser={this.props.loggedUser}
                                              role={this.state.role}
                                              timelineId={this.state.timelineBasicData.id}
                                />

                                <Timeline url={this.props.match.params.timeline_url}
                                          basicData={this.state.timelineBasicData}
                                          timelineRenderCount={this.props.timelineRenderCount}
                                          events={this.props.events}
                                />

                            </div> : null }
                    </Layout>
                </Layout>
            )
        }
    }

}


const mapStateToProps = state => {
    return {
        darkMode: state.sitesReducer.darkMode,
        timelineRenderCount : state.sitesReducer.timelineRenderCount,
        jwtToken: state.usersReducer.jwtToken,
        events: state.eventsReducer.events


    }
};

const mapDispatchToProps = dispatch => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);

