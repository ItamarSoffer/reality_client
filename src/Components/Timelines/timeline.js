import React from 'react';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import { Typography, BackTop } from 'antd';
import 'react-vertical-timeline-component/style.min.css';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import DataEvent from '../DataEvent/dataEventComponent';
import LoadingPage from '../LoadingComponent/LoadingPage';
import {backendAPI} from "../../Structure/api";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
import StoryTable from '../StoryTable/StoryTable';
import {getQueryStringParams} from "../../Actions/queryStringActions";


const { Title } = Typography;

class Timeline extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            timeline_events: []
        }
    }

    fetchData() {
        const TimelineUrl = this.props.url;
        const apiGetEvents = backendAPI.concat(`/timeline/${TimelineUrl}`);
        const queryParams = getQueryStringParams(this.props.history.location.search);

        const minTime = queryParams.min_time? queryParams.min_time: null;
        const maxTime = queryParams.max_time? queryParams.max_time: null;
        const searchString = queryParams.search_string? queryParams.search_string: null;
        const searchTags = queryParams.tags? queryParams.tags.split(","): null;
        // console.log(searchTags);
        // console.log(typeof searchTags);

        // console.log(apiGetEvents);
        axios.post(apiGetEvents,
            {
                jwt_token: this.props.jwtToken,
                min_time: minTime,
                max_time: maxTime,
                search_string: searchString,
                tags: searchTags
            })
            .then(res => res.data.events)
            .then((evs) => {
                this.setState({
                    timeline_events:evs,
                    isLoaded: true})});
                // .then(() => {console.log("StateEvents:", this.state.timeline_events)});
    }

    componentWillMount() {
        document.title = `Story: ${this.props.basicData.name}`;

        this.fetchData();
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.timelineRenderCount === 1) {
            this.fetchData();
            this.props.setReRenderTimeline(0);
        }
    }


    render() {
        if (!this.state.isLoaded) {
            // if Not Loaded:

            return <LoadingPage/>;
        }
        else if (this.state.timeline_events.length === 0){
            return (
                <div>

                <Title level={1} style={{textAlign:'center'}}>{this.props.basicData.name}</Title>
                <Title level={2} style={{textAlign:'center'}}>No events found.</Title>

                </div>
            )
        }
        else
            {
                //returns the timeline.
                const urlAddress = this.props.url;
                // extracts the view mode from url.
                const queryParams = getQueryStringParams(this.props.history.location.search);
                let viewMode = this.props.storyViewMode;
                if (queryParams.view){
                    viewMode = queryParams.view;
                }
            return (
                <div
                    //style={{backgroundColor: '#ccc'}}
                >

                    <Title level={1} style={{textAlign:'center'}}>{this.props.basicData.name}</Title>
                    <Title level={4} style={{textAlign:'center'}}>{this.props.basicData.description}</Title>
                    {viewMode !== 'timeline'?
                    <StoryTable
                        viewMode={viewMode}
                        url={urlAddress}
                        timeline_events={this.state.timeline_events.map(e => ({...e, iconAndColor: [e.icon, e.frame_color]}))

                        }/> : null}
                    {viewMode === 'timeline' ?
                        <VerticalTimeline
                            id={this.props.basicData.id}
                            style={{background: '#f00'}}>
                            {this.state.timeline_events.map(
                                function (evt) {
                                    return <DataEvent data={evt} url={urlAddress} />
                                })}
                        </VerticalTimeline> : null
                    }
                    <BackTop />

                </div>

            );
        }
    }
}
const mapStateToProps = state => {
  return {
      jwtToken: state.usersReducer.jwtToken,
      storyViewMode: state.sitesReducer.storyViewMode
  }
};

const mapDispatchToProps = dispatch => {
    return{
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Timeline));
