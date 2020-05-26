import React from 'react';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import axios from 'axios';
import {Tag, Layout} from 'antd';
import DataEvent from '../DataEvent/dataEventComponent';


const base_url = "http://itsoffer:5005/api/timeline/";

class Timeline extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            timeline_events: []
        }
    }

    componentDidMount() {
        const TimelineUrl = this.props.url;
        const url = base_url.concat(TimelineUrl);
        console.log(url);
        axios.get(url)
            .then(res => res.data.events)
            .then((evs) => {
                this.setState({
                    timeline_events:evs,
                    isLoaded: true})})
                .then(() => {console.log("StateEvents:", this.state.timeline_events)});
    }

    render() {
        if (!this.state.isLoaded) {
            // if Not Loaded:

            return <div>Loading</div>;
        }
        else
            {
                //returns the timeline.
            return (
                <div
                    style={{backgroundColor: '#ccc'}}>

                    <h1>{this.props.url}</h1>
                    <VerticalTimeline
                        style={{background: '#f00'}}>
                        {this.state.timeline_events.map(
                            function(evt){
                                return <DataEvent data={evt}/>
                            })}
                    </VerticalTimeline>
                </div>

            );
        }
    }
}

export default Timeline