import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
  MdWork as WorkIcon,
  MdSchool as SchoolIcon  } from "react-icons/md";
import {
  AiFillStar as StarIcon,
} from "react-icons/ai";
import axios from 'axios';
import {Tag, Layout} from 'antd';
import DataEvent from '../DataEvent/dataEventComponent';
import SideMenu from '../SideMenu/SideMenu';


const base_url = "http://itsoffer:5005/api/timeline/";
const data1 = {
    background_color: 'rgb(255, 255, 255)',
    event_time: "2011 - present",
    frame_color: 'rgb(33, 150, 0)',
    text_color: '#f00',
    icon_color: '#fff',
    icon: <WorkIcon />,
    header: "Creative Director",
    text: "check my dataEvent component"
};

class Timeline extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            timeline_events: []
        }
    }

    componentDidMount() {
        const TimelineUrl = this.props.match.params.timeline_url;
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
                <Layout style={{ minHeight: '100vh' }} >

                          <SideMenu />
                  <Layout>

                <div
                    style={{
                        backgroundColor: '#ccc',
                    }}>

                    <h2>{this.props.match.params.timeline_url}</h2>
                    <VerticalTimeline
                        style={{background: '#f00'}}>

                        {this.state.timeline_events.map(
                            function(evt){
                                return <DataEvent data={evt}/>
                            })}


                    </VerticalTimeline>
                </div>
                  </Layout>

                </Layout>

            );
        }
    }
}

export default Timeline