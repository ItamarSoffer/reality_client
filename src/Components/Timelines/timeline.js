import React from 'react';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import { Typography } from 'antd';
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

        // console.log(apiGetEvents);
        axios.post(apiGetEvents,
            {
                jwt_token: this.props.jwtToken,
                min_time: minTime,
                max_time: maxTime
            })
            .then(res => res.data.events)
            .then((evs) => {
                this.setState({
                    timeline_events:evs,
                    isLoaded: true})});
                // .then(() => {console.log("StateEvents:", this.state.timeline_events)});
    }

    componentDidMount() {
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
            return (
                <div
                    //style={{backgroundColor: '#ccc'}}
                >

                    <Title level={1} style={{textAlign:'center'}}>{this.props.basicData.name}</Title>
                    <Title level={4} style={{textAlign:'center'}}>{this.props.basicData.description}</Title>
                    {this.props.storyViewMode !== 'timeline'?
                    <StoryTable
                        timeline_events={this.state.timeline_events.map(e => ({...e, iconAndColor: [e.icon, e.frame_color]}))

                        }/> : null}
                    {this.props.storyViewMode === 'timeline' ?
                        <VerticalTimeline
                            id={this.props.basicData.id}
                            style={{background: '#f00'}}>
                            {this.state.timeline_events.map(
                                function (evt) {
                                    return <DataEvent data={evt}/>
                                })}
                        </VerticalTimeline> : null
                    }
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
