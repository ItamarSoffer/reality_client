import React from 'react';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import { Typography } from 'antd';
import 'react-vertical-timeline-component/style.min.css';

import axios from 'axios';
import DataEvent from '../DataEvent/dataEventComponent';
import LoadingPage from '../LoadingComponent/LoadingPage';
<<<<<<< HEAD
=======
import {backendAPI} from "../../Structure/api";
import {setReRenderTimelineAction} from "../../Actions/siteActions";
import {connect} from "react-redux";
<<<<<<< HEAD
>>>>>>> da2bd71... add auto update after change (add or delete event)
=======
import StoryTable from '../StoryTable/StoryTable';
import {getQueryStringParams} from "../../Actions/queryStringActions";
import {apiEditStoryDescription, apiEditStoryName, apiGetEvents} from "../../Actions/apiActions";
import {getStoryEventsAction, eventsCompareSorter} from "../../Actions/eventsActions";


>>>>>>> 8a372ee... add, edit and del event dont fetch all
const { Title } = Typography;

const base_url = "http://itsoffer:5005/api/timeline/";

class Timeline extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
<<<<<<< HEAD
            timeline_events: []
=======
            storyName: this.props.basicData.name,
            storyDescription: this.props.basicData.description
>>>>>>> 8a372ee... add, edit and del event dont fetch all
        }
    }

    fetchData() {
        const TimelineUrl = this.props.url;
<<<<<<< HEAD

<<<<<<< HEAD
        const apiGetBasicData = base_url.concat(`${TimelineUrl}/basic_data`);
        axios.get(apiGetBasicData)
            .then(res => res.data[0])
            .then((data) => {
                this.setState({
                    basic_data:data})})
                .then(() => {console.log("basic data", this.state.basic_data)});
=======
        const minTime = queryParams.min_time? queryParams.min_time: null;
        const maxTime = queryParams.max_time? queryParams.max_time: null;
        const searchString = queryParams.search_string? queryParams.search_string: null;
<<<<<<< HEAD
>>>>>>> df262e5... add string and date filters


        const apiGetEvents = base_url.concat(TimelineUrl);
        console.log(apiGetEvents);
=======
        const apiGetEvents = backendAPI.concat(`/timeline/${TimelineUrl}`);
        // console.log(apiGetEvents);
<<<<<<< HEAD
>>>>>>> 31ed3bc... add edit mode option to timeline
        axios.get(apiGetEvents)
=======
        axios.post(apiGetEvents,
            {
                jwt_token: this.props.jwtToken,
                min_time: minTime,
                max_time: maxTime,
                search_string: searchString
            })
>>>>>>> df262e5... add string and date filters
            .then(res => res.data.events)
            .then((evs) => {
                this.setState({
                    timeline_events:evs,
<<<<<<< HEAD
                    isLoaded: true})})
                .then(() => {console.log("StateEvents:", this.state.timeline_events)});
=======
                    isLoaded: true})});
                // .then(() => {console.log("StateEvents:", this.state.timeline_events)});
<<<<<<< HEAD
>>>>>>> 31ed3bc... add edit mode option to timeline
=======
=======
        const searchTags = queryParams.tags? queryParams.tags.split(","): null;

        apiGetEvents(this.props.jwtToken, storyUrl, minTime, maxTime, searchString, searchTags, fetchExtraData )
            .then((response) => {
                    if (response.status === 201) {
                        message.warning(response.data)
                    } else if (response.status === 200) {
                        this.setState({
                            isLoaded: true});
                        this.props.getStoryEvents(response.data.events)
                    }
                }
            )

    }

    componentWillMount() {
        document.title = `Story: ${this.state.storyName}`;
        this.fetchData(false);
>>>>>>> 8a372ee... add, edit and del event dont fetch all
    }
>>>>>>> da2bd71... add auto update after change (add or delete event)

    componentDidMount() {
        this.fetchData();
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.timelineRenderCount === 1) {
            console.log("IN HERE, will update");
            this.fetchData();
            this.props.setReRenderTimeline(0);
        }
<<<<<<< HEAD

=======
        if (nextState.storyName !== this.state.storyName){
            document.title = `Story: ${nextState.storyName}`;
        }
>>>>>>> 8a372ee... add, edit and del event dont fetch all
    }


    render() {
        if (!this.state.isLoaded) {
            // if Not Loaded:

            return <LoadingPage/>;
        }
        else if (this.props.events.length === 0){
            return (
                <div>

                <Title level={1} style={{textAlign:'center'}}>{this.props.url}</Title>
                <Title level={2} style={{textAlign:'center'}}>Empty! Start add some events.</Title>

                </div>
            )
        }
        else
            {
                //returns the timeline.
            return (
                <div
                    //style={{backgroundColor: '#ccc'}}
                >
<<<<<<< HEAD
=======
                    <ConfigProvider direction='rtl>'>
                        <Title level={1} editable={nameOnChange} style={{textAlign:'center'}}>{this.state.storyName}</Title>
                        <Title level={4} editable={descriptionOnChange} style={{textAlign:'center'}}>{this.state.storyDescription}</Title>
                    </ConfigProvider>
                    {viewMode !== 'timeline'?
                        <StoryTable
                            viewMode={viewMode}
                            url={urlAddress}
                            timeline_events={Object.values(this.props.events).sort(eventsCompareSorter)}
                            /> : null}
                    {viewMode === 'timeline' ?
                        <VerticalTimeline
                            id={this.props.basicData.id}
                            style={{background: '#f00'}}>
                            {Object.values(this.props.events).sort(eventsCompareSorter).map(
                                function (evt) {
                                    return <DataEvent data={evt} url={urlAddress} />
                                })}
                        </VerticalTimeline> : null
                    }
                    <BackTop />
>>>>>>> 8a372ee... add, edit and del event dont fetch all

                    <Title level={1} style={{textAlign:'center'}}>{this.props.basicData.name}</Title>
                    <Title level={4} style={{textAlign:'center'}}>{this.props.basicData.description}</Title>
                    <VerticalTimeline
                        id={this.props.basicData.id}
                        style={{background: '#f00'}}>
                        {this.state.timeline_events.map(
                            function(evt){
                                return <DataEvent data={evt}  />
                            })}
                    </VerticalTimeline>
                </div>

            );
        }
    }
}
const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
    return{
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))},
        getStoryEvents: (events) => {dispatch(getStoryEventsAction(events))},
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
