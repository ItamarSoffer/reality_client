import React from 'react';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import { Typography } from 'antd';
import 'react-vertical-timeline-component/style.min.css';

import axios from 'axios';
import DataEvent from '../DataEvent/dataEventComponent';
import LoadingPage from '../LoadingComponent/LoadingPage';
import {backendAPI} from "../../Structure/api";
const { Title } = Typography;




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
        const base_url = backendAPI.concat("/timeline/");
        const apiGetBasicData = base_url.concat(`${TimelineUrl}/basic_data`);
        axios.get(apiGetBasicData)
            .then(res => res.data[0])
            .then((data) => {
                this.setState({
                    basic_data:data})});
                // .then(() => {console.log("basic data", this.state.basic_data)});


        const apiGetEvents = base_url.concat(TimelineUrl);
        // console.log(apiGetEvents);
        axios.get(apiGetEvents)
            .then(res => res.data.events)
            .then((evs) => {
                this.setState({
                    timeline_events:evs,
                    isLoaded: true})})
                // .then(() => {console.log("StateEvents:", this.state.timeline_events)});


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

                    <Title level={1} style={{textAlign:'center'}}>{this.state.basic_data.name}</Title>
                    <Title level={4} style={{textAlign:'center'}}>{this.state.basic_data.description}</Title>

                    <VerticalTimeline
                        id={this.state.basic_data.id}
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