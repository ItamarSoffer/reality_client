import React from 'react';
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TimelineIcons from '../Icons/Icons'


{/*
the props.data will contain:
- event_id
V - header
V - text
TODO: - link
V - event_time
X - insertion_time
TODO: - create_user
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
                id={this.props.data.event_id}
            className="vertical-timeline-element--work"
            contentStyle={{
                background: this.props.data.background_color,
                color: this.props.data.text_color,
            borderTop: `3px solid ${this.props.data.frame_color}`}}
            contentArrowStyle={{ borderRight: `7px solid  ${this.props.data.background_color}` }}
            iconStyle={{ background: this.props.data.frame_color, color: this.props.data.icon_color }}
            icon={TimelineIcons[this.props.data.icon]}

            date={this.props.data.event_time}

          >{this.props.data.header ?
            <h2 className="vertical-timeline-element-title">{this.props.data.header}</h2>: null }
            {this.props.data.text ?
                <p style={{whiteSpace:"pre"}}>
                {this.props.data.text}
            </p>: null}
                {this.props.data.link ?
                    <a href={this.props.data.link}>{this.props.data.link}</a>: null}
          </VerticalTimelineElement>

        );
    }
}

export default DataEvent