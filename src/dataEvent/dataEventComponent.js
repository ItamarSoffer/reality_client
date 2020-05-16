import React from 'react';
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TimelineIcons from '../Icons/Icons'


{/*
the props.data will contain:
- event_id
V - header
V - text
- link
V - event_time
X - insertion_time
- create_user
V - text_color
V - background_color
V- frame_color
V - icon_color
V- icon

*/}
class DataEvent extends React.Component {

    render() {
        console.log("rendered me");
        return (
            <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
                background: this.props.data.background_color,
                color: this.props.data.text_color,
            borderTop: `3px solid ${this.props.data.frame_color}`}}
            contentArrowStyle={{ borderRight: `7px solid  ${this.props.data.background_color}` }}
            date={this.props.data.event_time}
            iconStyle={{ background: this.props.data.frame_color, color: this.props.data.icon_color }}
            icon={TimelineIcons[this.props.data.icon]}

          >
            <h1 className="vertical-timeline-element-title">{this.props.data.header}</h1>
            <h4>
                {this.props.data.text}
            </h4>
          </VerticalTimelineElement>

        );
    }
}

export default DataEvent