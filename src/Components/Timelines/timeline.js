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
>>>>>>> da2bd71... add auto update after change (add or delete event)
const { Title } = Typography;

const base_url = "http://itsoffer:5005/api/timeline/";

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
<<<<<<< HEAD

        const apiGetBasicData = base_url.concat(`${TimelineUrl}/basic_data`);
        axios.get(apiGetBasicData)
            .then(res => res.data[0])
            .then((data) => {
                this.setState({
                    basic_data:data})})
                .then(() => {console.log("basic data", this.state.basic_data)});


        const apiGetEvents = base_url.concat(TimelineUrl);
        console.log(apiGetEvents);
=======
        const apiGetEvents = backendAPI.concat(`/timeline/${TimelineUrl}`);
        // console.log(apiGetEvents);
>>>>>>> 31ed3bc... add edit mode option to timeline
        axios.get(apiGetEvents)
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

    }


    render() {
        if (!this.state.isLoaded) {
            // if Not Loaded:

            return <LoadingPage/>;
        }
        else if (this.state.timeline_events.length === 0){
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
        setReRenderTimeline: (index) => {dispatch(setReRenderTimelineAction(index))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
